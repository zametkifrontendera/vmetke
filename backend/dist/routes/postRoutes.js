import { Router } from "express";
import { createPost, getPosts, updatePost } from "../controllers/postController";
import { authMiddleware } from "../middlewares/authMiddlewares";
const router = Router();
router.post("/", authMiddleware, createPost);
router.get("/", getPosts);
router.put("/:id", authMiddleware, updatePost);
export default router;
