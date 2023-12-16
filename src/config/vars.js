require('dotenv').config();

module.exports = {
    mode: process.env.MODE,
    port: process.env.PORT,
    folderName: process.env.FOLDER,
    mongo: {
        url: process.env.MONGO_URI
    },
};