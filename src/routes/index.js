const express = require('express');
const router = express.Router();
const { store, show } = require('../app/controllers/file.controller');

router.get('/test', async (req, res) => {

    res.send(__dirname)
});

// upload new file  
router.post('/files', store);

// show exsiting file  
router.get('/files', show);

module.exports = router;