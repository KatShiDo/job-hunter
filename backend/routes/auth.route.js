import express from "express";
import { login, register, google, logout } from "../controllers/auth.controller.js";
import { validateCredentials } from "../utils/validateCredentials.js";

const router = express.Router();

router.post("/register", validateCredentials, register);
router.post("/login", login);
router.post("/google", google);
router.post("/logout", logout);

export default router;