const passport = require("passport");
const userModel = require("../models/model");
const postModel = require("../../post/models/model")
const localStrategy = require("passport-local");
const { getBucket } = require("../../../lib/gridfs");
const mongoose = require('mongoose');
passport.use(new localStrategy(userModel.authenticate()));

//registor 
exports.registor = (req, res) => {
  const { username, password, email, fullname } = req.body;
  const newUser = new userModel({ username, email, fullname });
  userModel.register(newUser, password, (err, user) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/profile");
    });
  });
};

//login
exports.login = (req, res) => {};

exports.authenticate = passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true,
});

exports.loginpage = (req, res)=> {
  res.render('login',{error: req.flash('error')});
};
//logout
exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

//profile
exports.profile = async (req, res) => {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  })
  .populate("posts");
  let count=0;
  let postArr = [[],[],[],[]];
  user.posts.forEach( function(post){
    if(count%4 == 0){
      postArr[0].push(post);
    }
    else if(count%4 == 1){
      postArr[1].push(post);
    }
    else if(count%4 == 2){
      postArr[2].push(post);
    }
    else if(count%4 == 3){
      postArr[3].push(post);
    }
    count++;
  })
  console.log(postArr);
  res.render("profile", {user: user});
};

//add new post
exports.add = async( req, res, next) =>{

  const user = await userModel.findOne({
    username: req.session.passport.user,
  })
  .populate("posts");
  let count=0;
  let postArr = [[],[],[],[]];
  user.posts.forEach( function(post){
    if(count%4 == 0){
      postArr[0].push(post);
    }
    else if(count%4 == 1){
      postArr[1].push(post);
    }
    else if(count%4 == 2){
      postArr[2].push(post);
    }
    else if(count%4 == 3){
      postArr[3].push(post);
    }
    count++;
  })
  // console.log(postArr);
    res.render('userposts', { postArr: postArr});
} 

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}

exports.addpost= (req,res, next) =>{
  res.render("addpost");
}
// getting image file from gridfs
exports.getFile = async (req, res) => {
  try {
    const bucket = getBucket();
    const fileIdOrName = req.params.id;

    let downloadStream;

    // Try to parse as ObjectId first
    if (mongoose.Types.ObjectId.isValid(fileIdOrName)) {
      const fileId = new mongoose.Types.ObjectId(fileIdOrName);
      downloadStream = bucket.openDownloadStream(fileId);
    } else {
      // fallback: treat as filename
      downloadStream = bucket.openDownloadStreamByName(fileIdOrName);
    }

    downloadStream.on('file', (file) => {
      // Dynamically set Content-Type if available
      if (file.contentType) {
        res.set('Content-Type', file.contentType);
      } else {
        res.set('Content-Type', 'application/octet-stream');
      }
    });

    downloadStream.on('error', (err) => {
      console.error('Download error:', err);
      res.status(404).send('File not found');
    });

    downloadStream.pipe(res);
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).send('Something went wrong.');
  }
};
//home
exports.home = async(req,res)=> {
  const user = await userModel.findOne({username: req.session.passport.user});
  const posts = await postModel.find()
  .populate("user");
  res.render('home', {user, posts});
}