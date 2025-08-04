const passport = require("passport");
const userModel = require("../models/model");
const postModel = require("../../post/models/model")
const localStrategy = require("passport-local");
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
  console.log(postArr);
    res.render('userposts', { postArr: postArr});
} 

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}

exports.addpost= (req,res, next) =>{
  res.render("addpost");
}
//home
exports.home = async(req,res)=> {
  const user = await userModel.findOne({username: req.session.passport.user});
  const posts = await postModel.find()
  .populate("user");
  res.render('home', {user, posts});
}