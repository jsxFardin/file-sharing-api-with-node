const fs = require('fs').promises; // Using fs.promises for asynchronous file operations
const File = require('../models/file.model');
const { inactivityPeriod } = require('../../config/vars');

async function cleanupUploadedFiles() {
    try {

        // Set the inactivity threshold for 7 days
        const inactivity = inactivityPeriod * 24 * 60 * 60 * 1000;

        // Calculate the threshold date based on the inactivity period
        const thresholdDate = new Date(Date.now() - inactivity);

        console.log('thresholdDate : ', thresholdDate);


        // Find documents older than the threshold date
        const outdatedDocuments = await File.find({ updatedAt: { $gte: thresholdDate } });

        // Iterate through outdated documents and remove associated files
        for (const document of outdatedDocuments) {
            // Remove the file from the file system
            await fs.unlink(document.path);

            // Remove the document from the MongoDB collection
            await File.findOneAndDelete(document._id);
        }

        console.log('File Cleanup job completed successfully!');
    } catch (error) {
        console.error('Error during cleanup job:', error);
    }
}

exports.cleanupUploadedFiles = cleanupUploadedFiles;