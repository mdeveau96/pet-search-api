import { Group } from "../models/group.js";
import { User } from "../models/user.js";

export const getGroups = async (req, res, next) => {
  try {
    const groups = await Group.find();
    res.status(200).json({ message: "Retrieved groups", groups: groups });
  } catch (err) {
    console.log(err);
  }
};

export const getGroup = async (req, res, next) => {
  const groupId = req.params.groupId;
  try {
    const group = await Group.findById(groupId);
    res.status(200).json({ message: "Retrieved group", group: group });
  } catch (err) {
    console.log(err);
  }
};

export const createGroup = async (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description || "";
  const members = req.body.members || [];
  try {
    const group = new Group({
      name: name,
      description: description,
      members: members,
    });
    await group.save();
    const user = await User.findById(req.userId);
    user.posts.push(post);
    await user.save();
    return res.status(201).json({
      message: "Group created",
      group: group,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateGroup = async (req, res, next) => {
  const groupId = req.params.groupId;
  const updatedName = req.body.name;
  const updatedDesc = req.body.description;
  try {
    const group = await Group.findById(groupId);
    await group.updateGroup(updatedName, updatedDesc);
    return res.status(200).json({
      message: "Group updated",
      group: group,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteGroup = async (req, res, next) => {
  const groupId = req.params.groupID;
  try {
    const group = await Group.findById(groupId);
    const members = group.members;
    await group.findByIdAndDelete(groupId);
    members.forEach(async (member) => {
      const user = await User.findById(member.user.userId);
      user.memberOf.pull(group._id);
    });
    return res.status(200).json({
      message: "Group deleted",
    });
  } catch (err) {
    console.log(err);
  }
};

export const addMember = async (req, res, next) => {
  const groupId = req.params.groupId;
  const newMembers = req.body.newMembers;
  try {
    const group = await Group.findById(groupId);
    await group.addMember(newMembers);
    newMembers.forEach(async (member) => {
      const user = await User.findById(member);
      user.memberOf.push(group._id);
      await user.save();
    });
    return res.status(200).json({
      message: "New member added",
      group: group,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateMember = async (req, res, next) => {
  const groupId = req.params.groupId;
  const userId = req.body.memberId;
  const newRole = req.body.role;
  try {
    const group = await Group.findById(groupId);
    const user = await User.findById(userId);
    await group.updateMember(user, newRole);
    return res.status(200).json({
      message: `Member: ${user.username} updated`,
      group: group,
    });
  } catch (err) {
    console.log(err);
  }
};

export const removeMember = async (req, res, next) => {
  const groupId = req.params.groupId;
  const userId = req.body.memberId;
  try {
    const group = await Group.findById(groupId);
    const user = await User.findById(userId);
    await group.removeMember(user);
    user.memberOf.pull(group._id);
    await user.save();
    res.status(200).json({
      message: `Member: ${user.username} removed from group`,
      group: group,
    });
  } catch (err) {
    console.log(err);
  }
};
