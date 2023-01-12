const express = require('express');
const app = express();
const port = 3000;

const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');
const connect = require('./schemas');
const Post = require('./schemas/post');

connect();

app.use(express.json());
// app.use('/api', [postRouter, commentRouter]);
app.use('/post', postRouter);
app.use('/comment', commentRouter);

app.listen(3000, () => console.log('포트로 서버가 열렸어요!'));
