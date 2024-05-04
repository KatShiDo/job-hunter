import express from "express";
import { getUsers, updateUser, deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { validateCredentials } from "../utils/validateCredentials.js";

const router = express.Router();

router.get("/", getUsers);
router.put("/:userId", verifyToken, validateCredentials, updateUser);
router.delete("/:userId", verifyToken, deleteUser);

export default router;