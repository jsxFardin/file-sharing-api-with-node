const express = require('express');
const router = express.Router();
const { store, show, destroy } = require('../app/controllers/file.controller');
const { downloadLimit, uploadLimit } = require('../app/middlewares/apiCallLimit.middleware');

router.get('/', async (req, res) => {
    res.send('Welcome to File Sharing API Server')
});

// upload new file 
router.post('/files', uploadLimit, store);

// show exsiting file  
router.get('/files/:publicKey', downloadLimit, show);

// show exsiting file  
router.delete('/files/:privateKey', destroy);

module.exports = router;