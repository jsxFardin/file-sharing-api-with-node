const { mode } = require('../../config/vars');

/**
 * Error handler. Send stacktrace only during development
 * @param {err} req - The Express error object.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the chain.
 */
const handler = (err, req, res, next) => {
    const errorRes = {
        status: err.status || 500,
        message: err.message || 'Internal server error!',
        errors: err.errors,
        stack: err.stack,
    };

    if (mode !== 'development') {
        delete errorRes.stack;
    }

    if (res.headersSent) {
        next(errorRes);
    } else {
        return res.status(errorRes.status).json(errorRes);
    }

};
exports.handler = handler;

/**
 * Catch 404 and forward to error handler
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the chain.
 */
exports.notFound = (req, res, next) => {
    const err = {
        status: 404,
        message: 'Request URL not found!',
    };
    next(err);
};

