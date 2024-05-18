import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createJob } from "../controllers/job.controller.js";

const router = express.Router();

router.post("/", verifyToken, createJob);
router.get("/", getJobs);

export default router;