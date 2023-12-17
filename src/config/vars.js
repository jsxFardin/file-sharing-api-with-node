require('dotenv').config();

module.exports = {
    mode: process.env.MODE,
    port: process.env.PORT,
    folderName: process.env.FOLDER,
    dailyUploadLimit: process.env.DAILY_DOWNLOAD_LIMIT,
    dailyDownloadLimit: process.env.DAILY_UPLOAD_LIMIT,
    mongo: {
        url: process.env.MONGO_URI
    },
};