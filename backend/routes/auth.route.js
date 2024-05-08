import express from "express";
import { login, register, google, logout, refresh, jwtAuth } from "../controllers/auth.controller.js";
import { validateCredentials } from "../utils/validateCredentials.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/register", validateCredentials, register);
router.post("/login", login);
router.post("/google", google);
router.post("/logout", logout);
router.get("/refresh", refresh);
router.get("/jwt-auth", verifyToken, jwtAuth)

export default router;