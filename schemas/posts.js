const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  postsId: {
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
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Posts", postsSchema);