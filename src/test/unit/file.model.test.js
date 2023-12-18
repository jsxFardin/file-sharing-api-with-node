const chai = require('chai');
const mongoose = require('mongoose');
const { expect } = chai;
const File = require('../../app/models/file.model');
const { mongo } = require('../../config/vars');
const randomstring = require("randomstring");

describe('File Model Unit Tests', () => {
    // Before test, connect to the MongoDB test database
    before(async () => {
        await mongoose.connect(mongo.url);
    });

    const publicKey = randomstring.generate(10);
    const privateKey = randomstring.generate(10);

    // Test case for creating a new file
    it('should create a new file', async () => {
        const fileData = {
            publicKey: publicKey,
            privateKey: privateKey,
            originalname: 'example.txt',
            mimetype: 'text/plain',
            size: 1024,
            filename: 'example.txt',
            path: '/uploads/example.txt',
        };

        const newFile = await File.create(fileData);

        expect(newFile).to.be.an('object');
        expect(newFile).to.have.property('publicKey', publicKey);
        expect(newFile).to.have.property('privateKey', privateKey);
    });

    // Test case for finding a file by publicKey
    it('should find a file by publicKey', async () => {
        const foundFile = await File.findOne({ publicKey: publicKey });
        expect(foundFile).to.be.an('object');
        expect(foundFile).to.have.property('publicKey', publicKey);
    });

    // Test case for delete a file by privateKey
    it('should delete a file by privateKey', async () => {
        const deletedFile = await File.deleteOne({ privateKey: privateKey });
        expect(deletedFile).to.be.an('object');
        expect(deletedFile).to.have.property('acknowledged', true);
    });

    // After test, drop the test database and close the connection
    after(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

});
