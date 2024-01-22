const mongoose = require('mongoose');

// Define a Mongoose schema for model
const FileSchema = new mongoose.Schema({
    publicKey: String,
    privateKey: String,
    originalname: String,
    mimetype: String,
    size: Number,
    filename: String,
    path: String,
}, { timestamps: true });

const FileModel = mongoose.model('File', FileSchema);
module.exports = FileModel;