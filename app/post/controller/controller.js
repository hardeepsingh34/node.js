const postModel = require('../models/model')
const userModel = require('../../user/models/model')

exports.createPost = async (req,res,next)=>{
let createdpost = await postModel.create({
  postText:'hii this is hardeepkmn',
  user:'6889be61da922f68d22f2f72',
})
let user = await userModel.findById({_id:'6889be61da922f68d22f2f72'})

console.log(user.posts);
user.posts.push(createdpost._id);
await user.save();

res.send('done');

}

exports.allUserPosts= async(req, res, next)=>{
   let user= await userModel
   .findOne({_id:'6889be61da922f68d22f2f72'})
   .populate('posts')
   res.send(user);
}