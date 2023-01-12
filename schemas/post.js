const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  // postId: {    // post가 생성이 될 때마다 자동으로 newId가 생성이 되어서 필요 없음
  //   type: Number,
  //   required: true,
  //   // unique: true
  // },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type:Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema);
