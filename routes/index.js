var express = require('express');
var router = express.Router();
var user = require('../app/user/routes/routes')
var post = require('../app/post/routes/routes')
var multer = require('../app/multer/routes/routes')
/* GET home page. */


router.use('/', user);
router.use('/', post);
router.use('/', multer);


router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;
