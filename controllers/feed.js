import { Post } from "../models/post.js";

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    return res.json({
      message: "retrieved posts",
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
      creator: "I'm a user",
    });
    await post.save();
    return res.json({ message: "Post created" });
  } catch (err) {
    console.log(err);
  }
};
