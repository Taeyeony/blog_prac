const express = require('express');
const router = express.Router();
const Comment = require('../schemas/comment');

//  commentId 값을 받아오는 middleware
async function getComment(req, res, next) {
  const { id } = req.params;
  let comment;

  try {
    comment = await Comment.findById(id);
    if(!comment) {
      return res.json({ message: "게시글 조회에 실패하였습니다." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.comment = comment;
  next();
}


// 댓글 목록 조회
router.get('/', async (_, res) => {
  try {
    const comment = await Comment.find().select(["-password"]);
    res.json({ data: comment })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

// 댓글 달기
router.post('/:postId', async (req, res) => {
  const { postId } = req.params; // :postId를 params(: 다음에 오는 것을)로 받아오겠다
 
  if (!req.body) {
    return res.json({ message: "데이터 형식이 올바르지 않습니다." });
  }

  const { userName, password, content } = req.body;

  try {
    const comment = await Comment.create ({
          userName,
          content,
          password,
          postId
    });
    res.json({ data: comment });
  } catch (err) {
    res.status(500).json({ message: err.message })
  }  
});

// 댓글 상세 조회
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
    const comment = await Comment.find({ postId });
    res.json({ data: comment })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 댓글 수정
router.patch('/:id', getComment, async (req, res) => {
  const { content, userName, password } = req.body;
  const { comment } = res;

  const isPasswordCorrect = comment.password === password;

  if (isPasswordCorrect) {
    if (content) {
      comment.content = content;
    }
    if (userName) {
      comment.userName = userName;
    }
    console.log(comment)
    try {
      const updatedComment = await comment.save();
      res.json({ data: updatedComment });
      console.log(updatedComment)
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.json({ message: "비밀번호가 틀렸습니다." });
  }
});

// 댓글 삭제
router.delete('/:id', getComment, async (req, res) => {
  // const { id } = req.params; // params에서 입력 받은 :commentId를 객체구조분해할당을 통해 저장
  const { password } = req.body; // body에서 입력 받은 password를 객체구조분해할당을 통해 저장
  const { comment } = res;

  const isPasswordCorrect = comment.password === password;

  if (isPasswordCorrect) {
    try {
      await comment.remove();
      res.json({ message: "댓글을 삭제했습니다." });
    } catch (err) {
      res.json({ message: err.message });
    }
  } else {
    res.json({ message: "비밀번호가 틀렸습니다." });
  }
});

module.exports = router;
