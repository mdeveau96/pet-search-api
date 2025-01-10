import express from "express";

const router = express.Router();

router.get("/groups");
router.post("/groups");
router.get("/groups/:groupId");
router.post("/groups/:groupId");
router.patch("/groups/:groupId");
router.delete("/groups/:groupId");

export default router;
