/**
 * Creates an error, with a status code and a message
 * @param {Number} statusCode
 * @param {String} message
 */
class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

/**
 * Handle and structure errors, send corresponding response
 * @param {Error} err
 * @param {Response} res
 * @returns {JSON} error information
 */
const handleError = (err, res) => {
    let { statusCode } = err;
    const { message } = err;

    // Check if there exists any error code provided or give the 500 code
    statusCode = statusCode || 500;

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};

module.exports = {
    ErrorHandler,
    handleError,
};
