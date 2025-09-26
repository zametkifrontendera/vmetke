import { Router } from "express";
import { 
  sendMessage, 
  getConversations, 
  getMessages, 
  markMessagesAsRead 
} from "../controllers/messageController";
import { authMiddleware } from "../middlewares/authMiddlewares";

const router = Router();

router.post("/", authMiddleware, sendMessage);
router.get("/conversations", authMiddleware, getConversations);
router.get("/:partnerId", authMiddleware, getMessages);
router.put("/:partnerId/read", authMiddleware, markMessagesAsRead);

export default router;
