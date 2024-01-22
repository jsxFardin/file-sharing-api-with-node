const { expect } = require('chai');
const sinon = require('sinon');
const fs = require('fs').promises;
const mongoose = require('mongoose');
const File = require('../../app/models/file.model');
const { mongo } = require('../../config/vars');
const { cleanupUploadedFiles } = require('../../app/schedulers/fileCleanup');

describe('cleanupUploadedFiles', () => {
    beforeEach(async () => {
        // Connect to a test MongoDB database
        await mongoose.connect(mongo.url);
    });

    afterEach(async () => {
        // Disconnect from the MongoDB database after each test
        await mongoose.disconnect();
    });

    it('should cleanup outdated files', async () => {
        // Stub the fs.unlink method to avoid actual file deletion during the test
        const unlinkStub = sinon.stub(fs, 'unlink').resolves();

        // Create a test file with an updatedAt date older than the threshold
        const pastDate = new Date('2023-01-01');
        const outdatedFile = await File.create({
            publicKey: 'dfsdfsdf',
            privateKey: 'sdfsdf',
            originalname: 'file.jpg',
            mimetype: 'image/jpeg',
            size: 12345,
            filename: 'file.jpg',
            path: './src/test/integration/file.jpg',
            createdAt: pastDate,
            updatedAt: pastDate,
        });

        // Run the cleanup function
        await cleanupUploadedFiles();

        // Assert that fs.unlink was called with the correct path
        expect(unlinkStub.calledWith(outdatedFile.path)).to.be.true;

        // Assert that the file was deleted from the MongoDB collection
        const deletedFile = await File.findById(outdatedFile._id);

        expect(deletedFile).to.be.null;

        // Restore the original fs.unlink method
        unlinkStub.restore();
    });
});
