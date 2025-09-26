import { Router } from "express";
import { 
  sendFriendRequest, 
  getFriendRequests, 
  respondToFriendRequest, 
  getFriends, 
  removeFriend 
} from "../controllers/friendController";
import { authMiddleware } from "../middlewares/authMiddlewares";

const router = Router();

router.post("/request", authMiddleware, sendFriendRequest);
router.get("/requests", authMiddleware, getFriendRequests);
router.put("/request/:requestId", authMiddleware, respondToFriendRequest);
router.get("/", authMiddleware, getFriends);
router.delete("/:friendId", authMiddleware, removeFriend);

export default router;
