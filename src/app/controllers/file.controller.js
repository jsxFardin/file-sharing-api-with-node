const File = require('../models/file.model');
const multer = require('../../config/multer');
const randomstring = require("randomstring");
const { sendJSONResponse } = require('../helpers/response.hlper');


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
            sendJSONResponse(res, 'File upload failed', 500);
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
            sendJSONResponse(res, 'File uploaded successfully', 200, resData);
        } catch (error) {
            console.error(error);
            // common JSON response helper function
            sendJSONResponse(res, 'Internal Server Error', 500);
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
    res.send('this file is from controller')
};


/**
 * Delete file
 * @public
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
exports.delete = (req, res) => {

};
