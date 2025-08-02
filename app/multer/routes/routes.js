const express = require('express')
var router = express.Router();
var upload = require('../controller/controller')

router.post('/upload',upload.upload.single("file"),upload.fileUpload );

module.exports = router;