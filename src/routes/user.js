const express = require('express');
const userService = require('../services/user');
const { grantAccess } = require('../middlewares/accessControl');

const router = express.Router();

/**
 * @route POST login
 * @desc Authenticate user and provide acessToken
 * @access Public
 */
router.post('/login', userService.login);

/**
 * @route POST register
 * @desc Register a new user into the application
 * @access Private, can create users
 */
router.post(
    '/register',
    grantAccess('createAny', 'user'),
    // eslint-disable-next-line comma-dangle
    userService.register
);

module.exports = router;
