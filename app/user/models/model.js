const mongoose = require('mongoose');
const plm = require('passport-local-mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/printrest")
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  password: {
    type: String,
    
  },

   posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],

  dp: {
    type: String,   // URL of the display picture
    default: ''
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },

  fullname: {
    type: String,
    trim: true
  }
}, { timestamps: true });  // optional: adds createdAt and updatedAt
userSchema.plugin(plm);
const User = mongoose.model('User', userSchema);

module.exports = User;
