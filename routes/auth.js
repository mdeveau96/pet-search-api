import express from "express";

const router = express.Router();

router.get("/login");
router.post("/login");
router.get("/signup");
router.post("/signup");
router.get("/reset-password-request");
router.post("/reset-password-request");

export default router;
