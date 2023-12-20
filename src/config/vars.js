require('dotenv').config();

module.exports = {
    mode: process.env.MODE || 'development',
    port: process.env.PORT || 3000,
    clientURL: process.env.CLIENT_URL || 'http://localhost:3000',
    folderName: process.env.FOLDER || 'uploads',
    dailyUploadLimit: process.env.DAILY_DOWNLOAD_LIMIT || 50,
    dailyDownloadLimit: process.env.DAILY_UPLOAD_LIMIT || 50,
    uploadFileSize: process.env.UPLOAD_FILE_SIZE || 2,
    cleanupSchedule: process.env.CLEANUP_SCHEDULE || "0 0 * * *",
    inactivityPeriod: process.env.INACTIVITY_PERIOD || 7,
    mongo: {
        url: process.env.MONGO_URI || 'mongodb://localhost:27017/file_sharing_api'
    },
};