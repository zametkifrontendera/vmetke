import { Router } from "express";
import { getUserProfile, updateProfile, searchUsers } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddlewares";
const router = Router();
router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateProfile);
router.get("/search", authMiddleware, searchUsers);
export default router;
