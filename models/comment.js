import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
    creator: {
      type: ObjectId,
      ref: "User",
    },
    reactions: [
      {
        type: ObjectId,
        ref: "Reaction",
      },
    ],
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", CommentSchema);
