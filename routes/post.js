const express = require("express");
const router = express.Router();
const Post = require("../schemas/post");


// 게시글 목록 조회

router.get("/post", async (req, res) => {
  const post = await Post.find({})   //  db에 있는 게시글을 전부다 불러오겠다!!
  res.status(200).json({post})
});

// 게시글 상세 조회
router.get("/post/:postId", async (req, res) => {
  const {postId} = req.params;

   const [detail] = await Post.find({postId: postId});
  // const detail = await Posts.findById({postsId: postsId});

  res.json({detail});
})

// 게시글 생성

router.post("/post/", async (req, res) => {
  const {postId, userName, password, title, content} = req.body;

  const post = await Post.find({postId})

  if(post.length) {
    return res.status(400).json({
      success: false,
      errorMessage: '이미 존재하는 PostId입니다.'
    });
  }

  const createdPost = await Post.create({postId, userName, password, title, content});
  res.json({post: createdPost});
})

// 게시글 수정
router.put("/post/:postId", async(req, res) => {
  const postId = req.params
  const {userName, password, title, content} = req.body // 객체구조분해할당

  const modifyPost = await Post.find({postId})
  if (modifyPost.length){
    await Post.updateOne(
      {postId: postId}, //filter
      {$set: {userName:userName , password:password, title:title, content:content}} // update
    )
  }
  res.status(200).json({success:true})
})

// 게시글 삭제
router.delete("/post/:postId", async(req, res) => {
  const {postId} = req.params

  const deletePost = await Post.find({postId})   // 왜 모디파이 포스츠를.. 받아야 삭제가 되는지..? put, delete 함수가 다르기 때문에 변수 이름이 같아도 가능했던 것! 변수 이름을 소중히...
  if (deletePost.length){
    await Post.deleteOne({postId})
  }
  res.json({result: "success"})
})

module.exports = router;









