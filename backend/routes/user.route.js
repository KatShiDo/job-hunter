import express from "express";
import { getUsers, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { validateCredentials } from "../utils/validateCredentials.js";

const router = express.Router();

router.get("/", getUsers);
router.put("/:userId", verifyToken, validateCredentials, updateUser);

export default router;