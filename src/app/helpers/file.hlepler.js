const fs = require('fs');

/**
 * Create folder if not exists
 * @param {string} directoryName
 */
exports.createFolderIfNotExists = (directoryName) => {
    if (!fs.existsSync(directoryName)) {
        fs.mkdirSync(directoryName);
    }
}