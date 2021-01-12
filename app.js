//jshint esversion:6
require('dotenv').config();

/**
 * Initialize the requirements into variables
 */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { handleError } = require('./src/middlewares/errorHandler');
const { jwt } = require('./src/middlewares/accessControl');
const router = require('./src/routes');

// Initialize the application
const app = express();

// Set app dependancies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Use JWT to secure the API
app.use(jwt());

// Use the corresponding routes
app.use('/api/users', router.userRouter);

/**
 * Use the error handler as a middleware
 * so all the routes can use it
 * @param {Error} err
 * @param {Request} _req
 * @param {Response} res
 */
app.use((err, _req, res) => {
    handleError(err, res);
});

/**
 * If it is displayed in heroku,
 * add the build path
 */
if (process.env.NODE_ENV === 'production') {
    app.user(express.static('client/build'));

    app.get('*', (request, response) => {
        response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

/**
 * Check if there is any 404 error
 * @param {Request} _req
 * @param {Response} res
 * @returns {JSON} error information
 */
app.use((_req, res) => {
    res.status(404).json({
        status: 'error',
        statusCode: 404,
        message: 'Not Found',
    });
});

/**
 * Export the app to use at the www
 */
module.exports = app;
