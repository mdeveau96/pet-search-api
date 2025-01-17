import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: ObjectId,
        ref: "Post",
      },
    ],
    memberOf: [
      {
        type: ObjectId,
        ref: "Group",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
