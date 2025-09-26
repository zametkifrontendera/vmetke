import { friendService } from "../services/friendService";
export const sendFriendRequest = async (req, res) => {
    try {
        const senderId = req.user.id;
        const { receiverId } = req.body;
        if (!receiverId) {
            return res.status(400).json({ error: "Receiver ID is required" });
        }
        const request = await friendService.sendFriendRequest(senderId, receiverId);
        res.json(request);
    }
    catch (err) {
        console.error("❌ Ошибка при отправке запроса в друзья:", err);
        res.status(400).json({ error: err.message });
    }
};
export const getFriendRequests = async (req, res) => {
    try {
        const userId = req.user.id;
        const requests = await friendService.getFriendRequests(userId);
        res.json(requests);
    }
    catch (err) {
        console.error("❌ Ошибка при получении запросов в друзья:", err);
        res.status(500).json({ error: "Не удалось загрузить запросы" });
    }
};
export const respondToFriendRequest = async (req, res) => {
    try {
        const userId = req.user.id;
        const { requestId, action } = req.body;
        if (!requestId || !action) {
            return res.status(400).json({ error: "Request ID and action are required" });
        }
        if (!["accept", "reject"].includes(action)) {
            return res.status(400).json({ error: "Action must be 'accept' or 'reject'" });
        }
        await friendService.respondToFriendRequest(requestId, userId, action);
        res.json({ success: true });
    }
    catch (err) {
        console.error("❌ Ошибка при ответе на запрос в друзья:", err);
        res.status(400).json({ error: err.message });
    }
};
export const getFriends = async (req, res) => {
    try {
        const userId = req.user.id;
        const friends = await friendService.getFriends(userId);
        res.json(friends);
    }
    catch (err) {
        console.error("❌ Ошибка при получении друзей:", err);
        res.status(500).json({ error: "Не удалось загрузить друзей" });
    }
};
export const removeFriend = async (req, res) => {
    try {
        const userId = req.user.id;
        const { friendId } = req.params;
        await friendService.removeFriend(userId, friendId);
        res.json({ success: true });
    }
    catch (err) {
        console.error("❌ Ошибка при удалении из друзей:", err);
        res.status(400).json({ error: err.message });
    }
};
