const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
   postId1: {
     type: Number,
     required: true,
   },
  commentId: {
    type: Number,
    required: true,
    unique: true
  },
  userName: { 
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Comment", commentSchema);