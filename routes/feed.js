import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { getPosts, createPost } from "../controllers/feed.js";

const router = express.Router();

router.get("/posts", isAuth, getPosts);
router.post("/post", isAuth, createPost);
router.patch("/post/:postId", isAuth,);
router.delete("/post/:postId", isAuth,);
router.get("/post/:postId/likes", isAuth,);
router.post("/post/:postId/like", isAuth,);
router.delete("/post/:postId/like", isAuth,);
router.get("/post/:postId/reactions", isAuth,);
router.post("/post/:postId/reaction", isAuth,);
router.delete("/post/:postId/reaction", isAuth,);
router.get("/post/:postId/comments", isAuth,);
router.post("/post/:postId/comment", isAuth,);
router.patch("/post/:postId/comment", isAuth,);
router.delete("/post/:postId/comment", isAuth,);

export default router;
