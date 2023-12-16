const multer = require('multer');
const { folder } = require('./vars');

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, folder); // Store files in the "uploads" directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Add a timestamp to the filename
    },
});

const multerUpload = multer({ storage: storage });

module.exports = multerUpload;