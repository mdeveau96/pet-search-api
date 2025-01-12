import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  postLike,
  postReaction,
  postComment,
} from "../controllers/feed.js";

const router = express.Router();

router.get("/posts", isAuth, getPosts);
router.post("/posts", isAuth, createPost);
router.get("/post/:postId", isAuth, getPost);
router.patch("/post/:postId", isAuth, updatePost);
router.delete("/post/:postId", isAuth, deletePost);
router.post("/post/:postId/like", isAuth, postLike);
router.post("/post/:postId/reaction", isAuth, postReaction);
router.post("/post/:postId/comments", isAuth, postComment);
router.patch("/post/:postId/comment", isAuth);
router.delete("/post/:postId/comment", isAuth);

export default router;
