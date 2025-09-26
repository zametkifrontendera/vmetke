import prisma from "../models/prismaClient";
export const userService = {
    async getUserProfile(userId) {
        return prisma.user.findUnique({
            where: { id: userId },
            include: {
                posts: {
                    orderBy: { createdAt: "desc" },
                    take: 10
                },
                friendships1: {
                    include: { user2: true }
                },
                friendships2: {
                    include: { user1: true }
                }
            }
        });
    },
    async updateProfile(userId, data) {
        return prisma.user.update({
            where: { id: userId },
            data,
            select: {
                id: true,
                name: true,
                email: true,
                bio: true,
                avatar: true,
                createdAt: true
            }
        });
    },
    async searchUsers(query, currentUserId) {
        return prisma.user.findMany({
            where: {
                AND: [
                    { id: { not: currentUserId } },
                    {
                        OR: [
                            { name: { contains: query, mode: "insensitive" } },
                            { email: { contains: query, mode: "insensitive" } }
                        ]
                    }
                ]
            },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                bio: true
            },
            take: 20
        });
    }
};
