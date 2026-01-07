const express = require("express");
const app = express();

app.use(express.json());

const users = new Map();
const posts = new Map();
const comments = new Map();

app.post("/users", (req, res) => {
  const { id, name } = req.body;
  users.set(id, { id, name, posts: [] });
  res.json({ message: "User created" });
});

app.post("/posts", (req, res) => {
  const { postId, userId, title, content } = req.body;
  if (!users.has(userId)) return res.status(400).json({ error: "User not found" });

  posts.set(postId, { postId, userId, title, content, comments: [] });
  users.get(userId).posts.push(postId);

  res.json({ message: "Post created" });
});

app.post("/comments", (req, res) => {
  const { commentId, postId, userId, text } = req.body;
  if (!posts.has(postId)) return res.status(400).json({ error: "Post not found" });

  comments.set(commentId, { commentId, postId, userId, text });
  posts.get(postId).comments.push(commentId);

  res.json({ message: "Comment added" });
});

app.get("/users/:id/posts", (req, res) => {
  const user = users.get(Number(req.params.id));
  if (!user) return res.json([]);

  const result = user.posts.map(id => posts.get(id));
  res.json(result);
});

app.get("/posts/:id/comments", (req, res) => {
  const post = posts.get(Number(req.params.id));
  if (!post) return res.json([]);

  const result = post.comments.map(id => comments.get(id));
  res.json(result);
});

app.delete("/posts/:id", (req, res) => {
  const postId = Number(req.params.id);
  const post = posts.get(postId);
  if (!post) return res.json({});

  post.comments.forEach(id => comments.delete(id));
  users.get(post.userId).posts = users.get(post.userId).posts.filter(id => id !== postId);
  posts.delete(postId);

  res.json({ message: "Post deleted" });
});

app.delete("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.get(userId);
  if (!user) return res.json({});

  user.posts.forEach(postId => {
    const post = posts.get(postId);
    post.comments.forEach(id => comments.delete(id));
    posts.delete(postId);
  });

  users.delete(userId);
  res.json({ message: "User deleted with cascade" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
