const expressJwt = require('express-jwt');
const { roles } = require('../models/roles');
const { models } = require('../models');

const { User } = models;

/**
 *
 * @param {Request} req
 * @param {Object} payload (an object with the JWT claims)
 * @param {Function} done (A function with signature err, revoked)
 *     @param {Error} err
 *     @param {Boolean} revoked (true if the JWT is revoked)
 * @returns {Function}
 */
async function isRevoked(_req, payload, done) {
    // Retrieve the subject from the JWT claims and get the user
    const subject = payload.sub;
    const user = await User.findById(subject);

    // Revoke the token if user no longer exists
    if (!user) {
        return done(null, true);
    }
    return done();
}

/**
 * Function to authenticate the user
 * @returns {jwt} expressJwt if exists
 */
function jwt() {
    // Get the secret from the process env
    const secret = process.env.JWT_SECRET;

    return expressJwt({
        secret,
        isRevoked,
        algorithms: ['RS256'],
    }).unless({
        path: [
            // public routes that don't require authentication
            '/login',
        ],
    });
}

/**
 * Allow if user has the right permissions
 * @param {String} action
 * @param {String} resource
 * @returns {JSON} error message if not right permissions
 */
const grantAccess = (action, resource) => async (req, res, next) => {
    try {
        const permission = roles.can(req.user.role)[action](resource);
        if (!permission.granted) {
            return res.status(401).json({
                status: 'error',
                statusCode: 401,
                message:
                    "You dont't have enough permissions to perform this action",
            });
        }

        req.filterFn = permission.filter.bind(permission);
        return next();
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    jwt,
    grantAccess,
};
