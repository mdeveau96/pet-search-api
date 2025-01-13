import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ReactionSchema = new Schema(
  {
    emoji: {
      type: String,
      required: true,
    },
    reactor: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Reaction = mongoose.model("Reaction", ReactionSchema);
