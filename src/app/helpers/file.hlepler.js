const fs = require('fs');

// Create folder if not exists
exports.createFolderIfNotExists = (folder) => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }
}