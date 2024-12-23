import express from "express";
import {
  findManyUsers,
  findUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, findManyUsers);
router.get("/:id", authMiddleware, findUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
