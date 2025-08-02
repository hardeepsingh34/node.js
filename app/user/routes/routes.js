var express = require('express');
var router = express.Router();
var user = require('../controller/controller');

//routes
router.post('/registor', user.registor);
router.post('/login',user.authenticate, user.login);
router.get("/login", user.loginpage);
router.get('/logout', user.logout);
router.get('/profile', user.isLoggedIn, user.profile);


module.exports = router;