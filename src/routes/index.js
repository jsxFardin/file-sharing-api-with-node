const express = require('express');
const router = express.Router();
const fileController = require('../app/controllers/file.controller');

router.get('/test', async (req, res) => {

    res.send(__dirname)
});

// upload new file  
router.post('/files', fileController.store);

// show exsiting file  
router.get('/files', fileController.show);

module.exports = router;