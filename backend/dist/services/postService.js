import prisma from "../models/prismaClient";
export const postService = {
    async createPost(authorId, content) {
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
    },
    async updatePost(postId, authorId, content) {
        const post = await prisma.post.findUnique({ where: { id: postId } });
        if (!post || post.authorId !== authorId)
            return null;
        return prisma.post.update({
            where: { id: postId },
            data: { content },
            include: { author: true }
        });
    }
};
