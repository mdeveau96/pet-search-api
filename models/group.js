import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;

const GroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    members: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const Group = mongoose.model("Group", GroupSchema);
