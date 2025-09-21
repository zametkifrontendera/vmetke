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
