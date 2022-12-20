const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postId: {
    type: Number,
    required: true,
    // unique: true
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
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Post", postSchema);