import express from "express";
import { getPosts, createPost } from "../controllers/feed.js";

const router = express.Router();

router.get("/posts", getPosts);
router.post("/post", createPost);
router.patch("/post/:postId");
router.delete("/post/:postId");
router.get("/post/:postId/likes");
router.post("/post/:postId/like");
router.delete("/post/:postId/like");
router.get("/post/:postId/reactions");
router.post("/post/:postId/reaction");
router.delete("/post/:postId/reaction");
router.get("/post/:postId/comments");
router.post("/post/:postId/comment");
router.patch("/post/:postId/comment");
router.delete("/post/:postId/comment");

export default router;
