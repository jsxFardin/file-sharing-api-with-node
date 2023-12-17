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
 */
exports.store = async (req, res) => {
    multer.single('file')(req, res, async (err) => {
        if (err) {
            console.error(err);
            // common JSON response helper function
            return sendJSONResponse(res, 'File upload failed', 500);
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
            return sendJSONResponse(res, 'File uploaded successfully', 200, resData);
        } catch (error) {
            console.error(error);
            // common JSON response helper function
            return sendJSONResponse(res, 'Internal Server Error', 500);
        }
    });
};

/**
 * show exsiting file
 * @public
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
exports.show = async (req, res) => {
    const publicKey = req.params.publicKey;

    try {
        const file = await File.findOne({ publicKey: publicKey });

        if (!file) {
            // common JSON response helper function
            return sendJSONResponse(res, 'File not found', 404);
        }
        // Set the Content-Type header based on the file's mimetype
        res.setHeader('Content-Type', file.mimetype);

        res.sendFile(file.path, { root: './' });
    } catch (error) {
        console.error(error);
        // common JSON response helper function
        return sendJSONResponse(res, 'Internal Server Error', 500);
    }
};


/**
 * Delete file
 * @public
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
exports.destroy = async (req, res) => {
    const privateKey = req.params.privateKey;

    try {
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
        return sendJSONResponse(res, 'File deleted successfully', 200);
    } catch (error) {
        console.error(error);
        // common JSON response helper function
        return sendJSONResponse(res, 'Internal Server Error', 500);
    }
};
