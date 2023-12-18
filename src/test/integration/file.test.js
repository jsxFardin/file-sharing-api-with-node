const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const { expect } = chai;

chai.use(chaiHttp);

describe('File Controller API Integration Tests', () => {
    let publicKey;
    let privateKey;

    // Test case for uploading a file
    it('should upload a file', async () => {
        const res = await chai
            .request(app)
            .post('/files')
            .attach('file', './src/test/integration/file.jpg');

        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('publicKey');
        expect(res.body.data).to.have.property('privateKey');

        publicKey = res.body.data.publicKey;
        privateKey = res.body.data.privateKey;
    });

    // Test case for retrieving an existing file
    it('should retrieve an existing file', async () => {
        const res = await chai.request(app).get(`/files/${publicKey}`);

        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type', 'image/jpeg');
    });

    // Test case for deleting an existing file
    it('should delete an existing file', async () => {
        const res = await chai.request(app).delete(`/files/${privateKey}`);

        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('File deleted successfully');
    });

    // Test case for attempting to retrieve a deleted file
    it('should not retrieve a deleted file', async () => {
        const res = await chai.request(app).get(`/files/${publicKey}`);

        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('File not found');
    });

});
