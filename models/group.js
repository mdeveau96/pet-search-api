import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

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
        user: {
          userId: {
            type: ObjectId,
            ref: "User",
            required: true,
          },
        },
        role: {
          type: String,
          enum: ["admin", "member"],
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

GroupSchema.methods.updateGroup = function (name, description) {
  
}

export const Group = mongoose.model("Group", GroupSchema);
