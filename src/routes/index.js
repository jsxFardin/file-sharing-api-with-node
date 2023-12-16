const express = require('express');
const router = express.Router();
const fileController = require('../app/controllers/file.controller');

router.get('/test', async (req, res) => {

    res.send('this a file sharing rest api!')
});

router.get('/files', fileController.show);

module.exports = router;