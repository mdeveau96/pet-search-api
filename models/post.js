import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;

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
    likes: {
      type: Number,
    },
    // creator: {
    //   type: ObjectId,
    //   ref: "User",
    //   required: true
    // },
    creator: {
      type: String,
    },
    comments: [
      {
        type: ObjectId,
        ref: "Comment",
      },
    ],
    reactions: [
      {
        type: ObjectId,
        ref: "Reaction",
      },
    ],
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", PostSchema);
