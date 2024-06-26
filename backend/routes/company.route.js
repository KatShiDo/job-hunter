import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createCompany } from "../controllers/company.controller.js";

const router = express.Router();

router.post("/", verifyToken, createCompany);

export default router;