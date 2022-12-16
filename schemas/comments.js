const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  commentsId: {
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

module.exports = mongoose.model("Comments", commentsSchema);