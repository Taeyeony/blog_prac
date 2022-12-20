const express = require("express");
const router = express.Router();

const Comment = require("../schemas/comment");



// 댓글 상세 조회
router.get("/comment/:postId", async(req, res) => {   // 비동기식으로 쓸 수 있게 해주는  async
  const {postId} = req.params;

  const detail = await Comment.find({postId1: postId})  // db에서 찾아올건데, postId에 대한 번호와 db에 있는 postId1 두개가 서로 같은 것만 찾아 오겠다.
  res.json({detail})    // await이 붙어있는 함수는 await을 만나면  await 먼저 실행하고 다음으로 넘어간다. 
})


// 댓글 달기
router.post("/post/:postId/comment", async(req, res) => {
  console.log(req.body)
  const {postId} = req.params    // :postId를 params(: 다음에 오는 것을)로 받아오겠다
  const postId1 = Number(postId)
  console.log(postId1)

  const {commentId, userName, password, comment} = req.body
 
     if(comment === undefined) {    // body에서 입력받은 코멘트가 undefined 때
       return res.status(400).json({    // 에러 메시지 출력
         success: false,
         errorMessage: '내용을 입력해주세요.'
       });
     }

  const createdComment = await Comment.create({postId1, commentId, userName, password, comment});   // 코멘트 공란일 때 에러 메세지 띄우기
  res.json({comment:createdComment});
})

// 댓글 수정
router.put("/comment/:commentId", async(req, res) => {
  
  const {password, comment} = req.body    // body에서 password랑 comment를 객체구조분해할당을 통해서 변수에 저장

   const modifyComment = await Comment.find({password:password})  // db에 있는 password랑 입력받은 password가 같은 걸 변수인 modifyComment에 저장
   console.log(modifyComment)
   if (modifyComment.length){   // modifyComment에 길이가 있을 때,
    await Comment.updateOne(    // db에 있는 댓글 내용을 수정할 거다
       {password: password},
    {$set: {comment:comment}}   // db 댓글에 대한 부분을 입력받은 부분으로 수정할 것이다.
    ) 
   } else {   // modifyComment에 길이가 없을 때,
    return res.status(400).json({result:'비밀번호가 일치하지 않습니다.'})   // 다음과 같은 메세지를 전송한다.
   }
  res.status(200).json({success:true})
})


// 댓글 삭제
router.delete("/comment/:commentId", async(req, res) => {
  const {password} = req.body     // body에서 입력 받은 password를 객체구조분해할당을 통해 저장
  const {commentId} = req.params  // params에서 입력 받은 :commentId를 객체구조분해할당을 통해 저장
  console.log(password)

  
  let [deleteComment] = await Comment.find({commentId:commentId})   // db commentId와 입력받은 commentId 값이 같을 때 배열구조분해할당을 통해 deleteComment에 저장 ex> [{}] => {}
  console.log(deleteComment)
  commentPassword = deleteComment.password  // deleteComment.password를 통해서 password에 대한 값을 빼내 commentPassword에 저장
  console.log(deleteComment)

  if (commentPassword !== password){    // 입력 받은 password와 db의 commentPassword 값이 일치하지 않으면
    return res.status(400).json({result:'비밀번호가 일치하지 않습니다.'}) // 에러 메세지 출력
  } else {  // 입력 받은 password와 db의 commentPassword 값이 일치한다면
    await Comment.deleteOne({password}) // db에 있는 댓글 삭제
    res.status(200).json({result: '삭제 완료!'})    // 삭제 완료 메세지
  }
 
})
    

module.exports = router;