const File = require('../models/file.model');
const multer = require('../../config/multer');
const randomstring = require("randomstring");

/**
 * upload new file
 * @public
 */
exports.store = async (req, res, next) => {    
    multer.single('file')(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'File upload failed' });
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

            res.status(200).json(newFile);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
};

/**
 * show exsiting file
 * @public
 */
exports.show = async (req, res) => {
    res.send('this file is from controller')
};


/**
 * Delete file
 * @public
 */
exports.delete = (req, res, next) => {

};
