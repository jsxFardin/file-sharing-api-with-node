const File = require('../models/file.model');
const multer = require('../../config/multer');
const randomstring = require("randomstring");
const { sendJSONResponse } = require('../helpers/response.hlper');
const fs = require('fs').promises; // Using fs.promises for asynchronous file operations

/**
 * upload new file
 * @public
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the chain.
 */
exports.store = async (req, res, next) => {
    multer.single('file')(req, res, async (err) => {
        if (err) {
            next(err);
        }
        try {
            // store a new file
            const newFile = await File.create({
                originalname: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size,
                filename: req.file.filename,
                path: req.file.path,
                publicKey: randomstring.generate(10),
                privateKey: randomstring.generate(11)
            });

            const resData = {
                publicKey: newFile.publicKey,
                privateKey: newFile.privateKey
            };

            // common JSON response helper function
            return sendJSONResponse(res, 'File uploaded successfully', 201, resData);
        } catch (error) {
            next(error);
        }
    });
};

/**
 * show exsiting file
 * @public
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the chain.
 */
exports.show = async (req, res, next) => {
    try {
        const publicKey = req.params.publicKey;
        const file = await File.findOne({ publicKey: publicKey });

        if (!file) {
            // common JSON response helper function
            return sendJSONResponse(res, 'File not found', 404);
        }
        // Set the Content-Type header based on the file's mimetype
        res.setHeader('Content-Type', file.mimetype);

        res.sendFile(file.path, { root: './' });
    } catch (error) {
        next(error);
    }
};


/**
 * Delete file
 * @public
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the chain.
 */
exports.destroy = async (req, res, next) => {
    try {
        const privateKey = req.params.privateKey;

        const file = await File.findOne({ privateKey: privateKey });

        if (!file) {
            // common JSON response helper function
            return sendJSONResponse(res, 'File not found', 404);
        }
        // delete file
        await File.deleteOne({ privateKey: privateKey });

        // Delete the file from the filesystem
        await fs.unlink(file.path);

        // common JSON response helper function
        return sendJSONResponse(res, 'File deleted successfully');
    } catch (error) {
        next(error);
    }
};
