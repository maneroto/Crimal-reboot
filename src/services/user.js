const jwt = require('jsonwebtoken');
const hash = require('../utils/hash');
const { ErrorHandler } = require('../middlewares/errorHandler');
const { models } = require('../models');

const { User } = models;

/**
 * Authenticate the user
 * @param {String} email
 * @param {String} password
 * @returns {JSON} Access token
 */
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if the given user exists
        const user = await User.findOne({ email });
        if (!user) throw new ErrorHandler(401, 'Invalid credentials');

        // check if the given password is right
        const validPassword = await hash.validateItem(password, user.password);
        if (!validPassword) throw new ErrorHandler(401, 'Invalid credentials');

        // Sign the token and update it
        const accessToken = jwt.sign(
            // eslint-disable-next-line no-underscore-dangle
            { userId: user._id },
            process.env.JWT_SECRET,
            // eslint-disable-next-line comma-dangle
            { expiresIn: '1d' }
        );
        // eslint-disable-next-line no-underscore-dangle
        await User.findByIdAndUpdate(user._id, { accessToken });

        // Send the user info as response
        res.status(200).json({
            status: 'success',
            statusCode: 200,
            _id: user.id,
            first_name: user.first_name,
            email: user.email,
            role: user.role,
            accessToken,
        });
        return next();
    } catch (error) {
        return next(error);
    }
};

/**
 * Register a new user into the application
 * @param {String} email
 * @param {String} password
 * @param {String} role
 * @param {String} first_name
 * @param {String} last_name
 * @param {String} phone
 * @param {Object} location
 * @returns {JSON} Succesfull message
 */
const register = async (req, res, next) => {
    try {
        const {
            email,
            password,
            role,
            // eslint-disable-next-line camelcase
            first_name,
            // eslint-disable-next-line camelcase
            last_name,
            phone,
            location,
        } = req.body;

        // Check if email is already registered
        let newUser = await User.findOne({ email });
        if (newUser) {
            throw new ErrorHandler(409, `Email ${email} is already taken`);
        }

        const hashedPassword = await hash.hashItem(password);

        newUser = new User({
            email,
            password: hashedPassword,
            role: role || 'basic',
            first_name,
            last_name,
            phone,
            location,
        });

        // Sign the token and add it
        const accessToken = jwt.sign(
            // eslint-disable-next-line no-underscore-dangle
            { userId: newUser._id },
            process.env.JWT_SECRET,
            // eslint-disable-next-line comma-dangle
            { expiresIn: '1d' }
        );
        newUser.accessToken = accessToken;

        // Save the user to the database
        await newUser.save();

        res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'User has been registered successfully',
        });

        return next();
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    login,
    register,
};
