const express = require("express");
const router = express.Router();
const Posts = require("../schemas/posts");
const Comment = require("../schemas/comments");

// 게시글 목록 조회

router.get("/posts", async (req, res) => {
  const posts = await Posts.find({})   //  db에 있는 게시글을 전부다 불러오겠다!!
  res.status(200).json({posts})
});

// 게시글 상세 조회
router.get("/posts/:postsId", async (req, res) => {
  const {postsId} = req.params;

   const [detail] = await Posts.find({postsId: postsId});
  // const detail = await Posts.findById({postsId: postsId});

  res.json({detail});
})

// 게시글 생성

router.post("/posts/", async (req, res) => {
  const {postsId, userName, password, title, content} = req.body;

  const posts = await Posts.find({postsId})

  if(posts.length) {
    return res.status(400).json({
      success: false,
      errorMessage: '이미 존재하는 PostId입니다.'
    });
  }

  const createdPosts = await Posts.create({postsId, userName, password, title, content});
  res.json({post: createdPosts});
})

// 게시글 수정
router.put("/posts/:postsId", async(req, res) => {
  const {postsId} = req.params
  const {userName, password, title, content} = req.body // 객체 구조분해할당

  const modifyPosts = await Posts.find({postsId})
  if (modifyPosts.length){
    await Posts.updateOne(
      {postsId: postsId}, //filter
      {$set: {userName:userName , password:password, title:title, content:content}} // update
    )
  }
  res.status(200).json({success:true})
})

// 게시글 삭제
router.delete("/posts/:postsId", async(req, res) => {
  const {postsId} = req.params

  const deletePosts = await Posts.find({postsId})   // 왜 모디파이 포스츠를.. 받아야 삭제가 되는지..? put, delete 함수가 다르기 때문에 변수 이름이 같아도 가능했던 것! 변수 이름을 소중히...
  if (deletePosts.length){
    await Posts.deleteOne({postsId})
  }
  res.json({result: "success"})
})

module.exports = router;

// 댓글 달기
// router.post("/posts/:postsId/comments", async(req, res) => {
//   const {postsId} = req.params
//   const {}
// })







