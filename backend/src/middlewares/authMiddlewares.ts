import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface MyJwtPayload extends JwtPayload {
  id: string;
  email: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Нет токена авторизации" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET || "Ilviza.1610Malova";
    const decoded = jwt.verify(token, secret) as MyJwtPayload;

    if (!decoded.id || !decoded.email) {
      return res.status(401).json({ error: "Некорректный токен" });
    }

    (req as any).user = decoded;
    next();
  } catch (err) {
    console.error("❌ JWT error:", err);
    res.status(401).json({ error: "Неверный или истёкший токен" });
  }
};
