import { userService } from "../services/userService";
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await userService.getUserProfile(userId);
        res.json(profile);
    }
    catch (err) {
        console.error("❌ Ошибка при получении профиля:", err);
        res.status(500).json({ error: "Не удалось загрузить профиль" });
    }
};
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, bio, avatar } = req.body;
        const updated = await userService.updateProfile(userId, { name, bio, avatar });
        res.json(updated);
    }
    catch (err) {
        console.error("❌ Ошибка при обновлении профиля:", err);
        res.status(500).json({ error: "Не удалось обновить профиль" });
    }
};
export const searchUsers = async (req, res) => {
    try {
        const userId = req.user.id;
        const { q } = req.query;
        if (!q || typeof q !== "string") {
            return res.status(400).json({ error: "Query parameter is required" });
        }
        const users = await userService.searchUsers(q, userId);
        res.json(users);
    }
    catch (err) {
        console.error("❌ Ошибка при поиске пользователей:", err);
        res.status(500).json({ error: "Не удалось найти пользователей" });
    }
};
