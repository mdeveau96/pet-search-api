import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import {
  getGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  addMember,
  updateMember,
  removeMember,
} from "../controllers/groups.js";

const router = express.Router();

router.get("/groups", isAuth, getGroups);
router.post("/groups", isAuth, createGroup);
router.get("/groups/:groupId", isAuth, getGroup);
router.patch("/groups/:groupId", isAuth, updateGroup);
router.delete("/groups/:groupId", isAuth, deleteGroup);
router.patch("/groups/:groupId/members", isAuth, addMember);
router.patch("/groups/:groupId/members/:memberId", isAuth, updateMember);
router.delete("/group/:groupId/members/:memberId", isAuth, removeMember);

export default router;
