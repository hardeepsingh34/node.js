var express = require('express');
var router = express.Router();
var post = require('../controller/controller')

router.get('/createpost', post.createPost);
router.get('/alluserposts', post.allUserPosts);
module.exports = router;