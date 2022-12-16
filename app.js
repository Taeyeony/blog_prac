const express = require('express');
const app = express();
const port = 3000;

const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const connect = require("./schemas");

connect();


app.use(express.json());
app.use("/api", [postsRouter, commentsRouter]);


app.post("/", (req, res) => {
  console.log(req.body);

  res.json();
})

app.get("/", (req, res) => {
  console.log(req.query);

  res.send('정상적으로 반환하였습니다.');
})

app.get("/:id", (req, res) => {
  console.log(req.params);

  res.send(':id URI에 정상적으로 반환하였습니다.');
})





app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});