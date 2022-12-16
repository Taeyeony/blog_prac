const express = require("express");
const router = express.Router();

const Comment = require("../schemas/comments");
const Posts = require("../schemas/posts");

router.get("/comments", async(req, res) => {
  const comments = await Comment.find({});

  // const postsId = comments.map((comment) => {
  // comment.postsId
  // })
  // const posts = await Posts.find({postsId: postsId})

  const result = comments.map((comment) => {
    return {
      commentsId: comment.commentsId,
      userName: comment.userName,
      password: comment.password,
      comment: comment.comment  
    }
  })
  res.json({"result":result})
})
module.exports = router;