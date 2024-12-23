import { Router } from "express";
import authRoutes from "./auth.routes.js";
import eventRoutes from "./event.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/event", eventRoutes);
router.use("/user", userRoutes);

export default router;
