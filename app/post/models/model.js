const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  imageText: {
    type: String,
    required: true,
  },
  description:{
    type: String,
  },
  image:{
    type: String,
  },
user:{
 type: mongoose.Schema.Types.ObjectId,
 ref: 'User'
},
  createdAt: {
    type: Date,
    default: Date.now
  },
imageId:{
  type: String,
},
  likes: {
    type: Array,
    default: [],
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
