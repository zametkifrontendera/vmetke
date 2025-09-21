import prisma from "../models/prismaClient";

export const postService = {
  async createPost(authorId: string, content: string) {
    return prisma.post.create({
      data: { content, authorId },
      include: { author: true }
    });
  },

  async getAllPosts() {
    return prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: { author: true }
    });
  }
};
