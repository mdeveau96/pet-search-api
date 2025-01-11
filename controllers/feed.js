import { Post } from "../models/post.js";
import { User } from "../models/user.js";
import { Reaction } from "../models/reaction.js";

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    return res.json({
      message: "Retrieved posts",
      posts: posts,
    });
  } catch (err) {
    console.log(err);
  }
};

export const createPost = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl || undefined;
  const content = req.body.content;
  try {
    const post = new Post({
      title: title,
      imageUrl: imageUrl,
      content: content,
      creator: req.userId,
    });
    await post.save();
    const user = await User.findById(req.userId);
    user.posts.push(post);
    await user.save();
    return res.status(201).json({
      message: "Post created",
      post: post,
      creator: { _id: user._id, name: user.name },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getPost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      throwError("Post not found", 404);
    }
    return res.status(200).json({
      message: "Post fetched",
      post: post,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = async (req, res, next) => {
  const postId = req.params.postId;
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.imageUrl;
  if (req.file) {
    imageUrl = req.file.path.replace("\\", "/");
  }
  if (!imageUrl) {
    throwError("No file picked", 422);
  }
  try {
    const post = await Post.findById(postId);
    if (!post) {
      throwError("Post not found", 404);
    }
    if (post.creator.toString() !== req.userId) {
      throwError("Not Authorized", 403);
    }
    // TODO: Add logic to delete old image on update
    post.title = title;
    post.imageUrl = imageUrl;
    post.content = content;
    const result = await post.save();
    return res.status(200).json({ message: "Post updated", post: result });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      throwError("Could not find post", 404);
    }
    if (post.creator.toString() !== req.userId) {
      throwError("Not Authorized", 403);
    }
    // TODO: Add logic to delete old image on update
    await Post.findByIdAndDelete(postId);
    const user = await User.findById(req.userId);
    user.posts.pull(postId);
    await user.save();
    return res.status(200).json({ message: "Deleted post" });
  } catch (err) {
    console.log(err);
  }
};

export const postLike = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      throwError("Could not find post", 404);
    }
    if (!post.likes.includes(req.userId)) {
      post.likes.push(req.userId);
    }
    post.likes.pull(req.userId);
    await post.save();
    return res.status(200).json({ message: "Post liked", post: post });
  } catch (err) {
    console.log(err);
  }
};

export const postReaction = async (req, res, next) => {
  const postId = req.params.postId;
  const reaction = req.body.reaction;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      throwError("Could not find post", 404);
    }
    // post.reactions.push({ emoji: reaction, createdBy: req.userId });
    post.reactions.push(req.userId);
    await post.save();
    return res.status(200).json({ message: "Reaction saved", post: post });
  } catch (err) {
    console.log(err);
  }
};

const throwError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};
