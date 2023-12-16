const multer = require('multer');
const { folderName } = require('./vars');
const { createFolderIfNotExists } = require('../app/helpers/file.hlepler');

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        createFolderIfNotExists(folderName); // Create folder if not exists
        cb(null, folderName); // Store files in the "uploads" directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Add a timestamp to the filename
    },
});

const multerUpload = multer({ storage: storage });

module.exports = multerUpload;