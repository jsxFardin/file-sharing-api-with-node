/**
 * common JSON response helper function
 * @param {res} res - response object of the request
 * @param {string} message - response message 
 * @param {int} status - status code
 * @param {object} data - response data
 */
exports.sendJSONResponse = (res, message = 'Data retrieved successfully!', status = 200, data = null) => {
    const responseData = {
        status: status,
        message: message,
    }
    if (data) responseData.data = data;

    return res.status(status).json(responseData);
}