const multer = require('multer');
const { folderName } = require('./vars');
const fs = require('fs');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        createFolderIfNotExists(folderName);
        cb(null, folderName); // Store files in the "uploads" directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Add a timestamp to the filename
    },
});

const multerUpload = multer({ storage: storage });

module.exports = multerUpload;

// Create folder if not exists
const createFolderIfNotExists = (folder) => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }
}