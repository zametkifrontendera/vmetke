import { Request, Response } from "express";
import { messageService } from "../services/messageService";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const senderId = (req as any).user.id;
    const { receiverId, content } = req.body;
    
    if (!receiverId || !content) {
      return res.status(400).json({ error: "Receiver ID and content are required" });
    }

    const message = await messageService.sendMessage(senderId, receiverId, content);
    res.json(message);
  } catch (err) {
    console.error("❌ Ошибка при отправке сообщения:", err);
    res.status(500).json({ error: "Не удалось отправить сообщение" });
  }
};

export const getConversations = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const conversations = await messageService.getConversations(userId);
    res.json(conversations);
  } catch (err) {
    console.error("❌ Ошибка при получении разговоров:", err);
    res.status(500).json({ error: "Не удалось загрузить разговоры" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { partnerId } = req.params;
    
    if (!partnerId) {
      return res.status(400).json({ error: "Partner ID is required" });
    }

    const messages = await messageService.getMessages(userId, partnerId);
    res.json(messages);
  } catch (err) {
    console.error("❌ Ошибка при получении сообщений:", err);
    res.status(500).json({ error: "Не удалось загрузить сообщения" });
  }
};

export const markMessagesAsRead = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { partnerId } = req.params;
    
    if (!partnerId) {
      return res.status(400).json({ error: "Partner ID is required" });
    }

    await messageService.markMessagesAsRead(userId, partnerId);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Ошибка при отметке сообщений как прочитанных:", err);
    res.status(500).json({ error: "Не удалось отметить сообщения" });
  }
};
