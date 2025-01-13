import mongoose, { connect } from "mongoose";
// import { Reaction } from "./reaction";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: ObjectId,
        ref: "User",
        required: true,
      },
    ],
    creator: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        content: {
          type: String,
          required: true,
        },
        likes: {
          type: Number,
          required: true,
        },
        userId: {
          type: ObjectId,
          ref: "User",
          required: true,
        },
        reactions: [
          {
            type: ObjectId,
            ref: "Reaction",
            required: true,
          },
        ],
      },
    ],
    // reactions: [
    //   {
    //     type: ObjectId,
    //     ref: "Reaction",
    //     required: true,
    //   },
    // ],
  },
  { timestamps: true }
);

PostSchema.methods.updatePost = function (title, imageUrl, content) {
  this.title = title;
  this.imageUrl = imageUrl;
  this.content = content;
  return this.save();
};

PostSchema.methods.like = function (userId) {
  if (!this.likes.includes(userId)) {
    this.likes.push(userId);
  } else {
    this.likes.pull(userId);
  }
  return this.save();
};

// PostSchema.methods.react = function (reaction, userId) {
//   if (!this.likes.includes(userId)) {
//     this.likes.push(reaction);
//   } else {
//     this.likes.pull(userId);
//   }
//   return this.save();
// };

PostSchema.methods.addComment = function (content, userId) {
  const newComment = {
    content: content,
    likes: 0,
    userId: userId,
    reactions: [],
  };
  this.comments.push(newComment);
  return this.save();
};

PostSchema.methods.updateComment = function (commentId, newContent) {
  const postCommentIndex = this.comments.findIndex((pc) => {
    return pc._id.toString() === commentId.toString();
  });
  this.comments[postCommentIndex].content = newContent;
  return this.save();
};

PostSchema.methods.deleteComment = function (commentId) {
  const postCommentIndex = this.comments.findIndex((pc) => {
    return pc._id.toString() === commentId.toString();
  });
  this.comments.pull(this.comments[postCommentIndex]);
  return this.save();
};

export const Post = mongoose.model("Post", PostSchema);
