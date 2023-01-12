const express = require('express');
const router = express.Router();
const Post = require('../schemas/post');

// postId값을 받아오는 middleware: 클린코드를 위해 반복 되는 부분을 미들웨어로 정리
async function getPost(req, res, next) {
  const { id } = req.params;
  let post;

  try {
    post = await Post.findById(id);
   if (!post) {
    return res.json({ message: "게시글 조회에 실패하였습니다." });
    } 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.post = post;
  next();
}

// 게시글 목록 조회

router.get('/', async (req, res) => {
  try {
    const post = await Post.find().select(["-password"]); // get 요청시 password만 빼고 불러와짐
    res.json({ data: post }); // [{}, {}, {}] 배열에 담겨 반환
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});

// 게시글 상세 조회
router.get('/:id', getPost, async (req, res) => {
  res.json(res.post);
});

// 게시글 생성

router.post('/', async (req, res) => {
  const { userName, password, title, content } = req.body;

  try{
    const createdPost = await Post.create({
    userName,
    password,
    title,
    content,
  });
  res.json({ post: createdPost });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
});

// 게시글 수정
// 부분수정이 가능하게 할 때는 patch
router.patch('/:id', getPost, async (req, res) => {

  if (!req.body || !id) {   //body값이나  undefined거나 형식이 바르지 않을 때 err 내보내기
    return res.json({ message: "데이터 형식이 올바르지 않습니다." }); // 다음 코드가 실행되기 전에 코드가 실행돼야 하기 때문에 return 사용
  }
  const { userName, title, content, password } = req.body;
  const { post } = res;

  const isPasswordCorrect = post.password === password;   // 입력한 비밀번호가 같을 때 수정 할 수 있게 함

  if (isPasswordCorrect) {    // 입력한 비밀번호가 맞으면 수정
    if(userName) {
      post.userName = userName;
    }

    if(title) {
      post.title = title;
    }
    
    if(content) {
      post.content = content;
    }

    try {
      const updatedData = await post.save();
      res.json({ data: updatedData });
    } catch(err) {
      res.status(500).json({ message: err.message });
    }
  } else {    // 비밀번호가 다르면 에러 메세지
    res.status(401).json({ message: "비밀번호가 틀렸습니다." });
  }
 
});

// 게시글 삭제
router.delete('/:id', getPost, async (req, res) => {
  const { password } = req.body;
  const { post } = res;

  const isPasswordCorrect = post.password === password;

  if (isPasswordCorrect) {
      try {
      await post.remove();
      res.json({ message: "게시글을 삭제했습니다." });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(401).json({ message: "비밀번호가 틀렸습니다." });
  }

});

module.exports = router;
