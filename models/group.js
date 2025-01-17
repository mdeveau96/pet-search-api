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
  this.name = name;
  this.description = description;
  this.save();
};

GroupSchema.methods.addMember = function (users) {
  users.array.forEach(user => {
    if (!this.members.some((member) => member.user.userId.toString() === user.toString())) {
      this.members.push({user: {userId: user}, role: "member"});
    }
  });
  return this.save();
};

GroupSchema.methods.updateMember = function (user, role) {
  const memberIndex = this.members.findIndex((member) => {
    return member.user.userId.toString() === user._id.toString();
  });
  this.members[memberIndex].role = role;
  return this.save();
};

GroupSchema.methods.removeMember = function (user) {
  const memberIndex = this.members.findIndex((member) => {
    return member.user.userId.toString() === user.toString();
  });
  this.members.pull(this.members[memberIndex]);
  return this.save();
};

export const Group = mongoose.model("Group", GroupSchema);
