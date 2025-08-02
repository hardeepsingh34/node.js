const multer = require('multer');
const {v4: uuidv4} = require('uuid');
const path = require("path");
var userModel = require("../../user/models/model");
var postModel = require("../../post/models/model")

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/images/uploads');
    },
    filename: function(req, file, cb){
        const uniquename = uuidv4();
        cb( null, uniquename+ path.extname(file.originalname));
    }
});


exports.upload = multer({storage: storage});

exports.fileUpload = async (req, res)=>{
        if(!req.file){
         return res.status(400).send('No files were uploded.');
        }
        // jo file upload hui hai use save karo as a post and uska postid user ko do and post ko user ka id do 
        const user = await userModel.findOne({username: req.session.passport.user});
        const post = await postModel.create({
            image: req.file.filename,
            imageText:req.body.filecaption,
            user: user._id,
        });
        console.log(post._id);  
        user.posts.push(post._id);
        await user.save();
        res.redirect('/profile');
}