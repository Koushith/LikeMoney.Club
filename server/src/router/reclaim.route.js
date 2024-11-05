import { Router } from "express";
import { initializeReclaim } from "../controllers/reclaim.controller.js";

const router = Router();

router.get("/initialize-reclaim", initializeReclaim);

export default router;
