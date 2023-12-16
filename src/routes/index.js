const express = require('express');
const router = express.Router();


router.get('/test', async (req, res) => {

    res.send('this a file sharing rest api!')
});


module.exports = router;