const rateLimit = require("express-rate-limit");
const { dailyUploadLimit, dailyDownloadLimit } = require('../../config/vars');

const downloadLimit = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: dailyDownloadLimit,
    message: "You have reached maximum download limit for today. Please try again later",
    statusCode: 429,
    headers: true,
    keyGenerator(req) {
        return req.ip;
    },
});
exports.downloadLimit = downloadLimit;

const uploadLimit = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: dailyUploadLimit,
    message: "You have reached maximum upload limit for today. Please try again later",
    statusCode: 429,
    headers: true,
    keyGenerator(req) {
        return req.ip;
    },
});
exports.uploadLimit = uploadLimit;