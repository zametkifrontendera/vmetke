import { Request, Response } from "express";
import { postService } from "../services/postService";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const userId = (req as any).user.id;
    const post = await postService.createPost(userId, content);
    res.json(post);
  } catch (err) {
    console.error("❌ Ошибка при создании поста:", err);
    res.status(500).json({ error: "Не удалось создать пост" });
  }
};

export const getPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (err) {
    console.error("❌ Ошибка при загрузке постов:", err);
    res.status(500).json({ error: "Не удалось загрузить посты" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body as { content?: string };
    const userId = (req as any).user.id as string;

    if (!content || !content.trim()) {
      return res.status(400).json({ error: "Пустое содержимое" });
    }

    const updated = await postService.updatePost(id, userId, content.trim());
    if (!updated) {
      return res.status(403).json({ error: "Нет прав на редактирование" });
    }
    res.json(updated);
  } catch (err) {
    console.error("❌ Ошибка при редактировании поста:", err);
    res.status(500).json({ error: "Не удалось редактировать пост" });
  }
};
