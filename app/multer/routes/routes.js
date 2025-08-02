const express = require('express')
var router = express.Router();
var upload = require('../controller/controller')
const user = require("../../user/controller/controller")

router.post('/upload',user.isLoggedIn ,upload.upload.single("file"),upload.fileUpload );

module.exports = router;