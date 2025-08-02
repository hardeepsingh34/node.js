const passport = require("passport");
const userModel = require("../models/model");

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
  console.log(user);
  res.render("profile", { user: user });
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
};