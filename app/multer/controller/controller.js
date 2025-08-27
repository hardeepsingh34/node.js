const multer = require('multer');
const { Readable } = require('stream');
const { getBucket } = require('../../../lib/gridfs');
var userModel = require("../../user/models/model");
var postModel = require("../../post/models/model")
const { GridFsStorage } = require('@lenne.tech/multer-gridfs-storage');
const path = require('path');
const { v4: uuidv4 } = require('uuid');



const storage = new GridFsStorage({
  url: "mongodb://127.0.0.1:27017/printrest",
  file: (req, file) => {
    return {
      filename: uuidv4() + path.extname(file.originalname),
      bucketName: 'uploads'
    };
  }
});

exports.upload = multer({ storage });






// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, './public/images/uploads');
//     },
//     filename: function(req, file, cb){
//         const uniquename = uuidv4();
//         cb( null, uniquename+ path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: multer.memoryStorage() });

// exports.fileUpload = async (req, res)=>{
//    try{     if(!req.file){
//          return res.status(400).send('No files were uploded.');
//         }
//         // jo file upload hui hai use save karo as a post and uska postid user ko do and post ko user ka id do 
//         const user = await userModel.findOne({username: req.session.passport.user});
//         const post = await postModel.create({
//             image: req.file.filename,
//             imageText:req.body.filecaption,
//             user: user._id,
//             description: req.body.description,
//         });
//         console.log(post);  
//         user.posts.push(post._id);
//         await user.save();
//         console.log("Post saved:", post);

//         res.redirect('/userposts');
//         } catch (err) {
//     console.error("File upload error:", err)

//     res.status(500).send("Something went wrong.");
//   }
// }

exports.fileUpload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).send('No file was uploaded.');

    const username = req.session?.passport?.user;
    const user = await userModel.findOne({ username });
    if (!user) return res.status(401).send('User not found / not logged in.');

    // req.file contains GridFS info directly

    console.log(req.file.id, 'jkdjkfdjkfdjkdjfdkjdkjdfk');


    const post = await postModel.create({
      imageId: String(req.file.id),       // <-- comes from multer-gridfs-storage
      imageName: req.file.filename,
      imageText: req.body.filecaption,
      user: user._id,
      description: req.body.description,
    });

    console.log(post, "post data")


    user.posts.push(post._id);
    await user.save();

    res.redirect('/userposts');
  } catch (err) {
    console.error("File upload error:", err);
    res.status(500).send("Something went wrong.");
  }
};





