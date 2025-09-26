import prisma from "../models/prismaClient";
export const messageService = {
    async sendMessage(senderId, receiverId, content) {
        return prisma.message.create({
            data: { senderId, receiverId, content },
            include: {
                sender: { select: { id: true, name: true, avatar: true } },
                receiver: { select: { id: true, name: true, avatar: true } }
            }
        });
    },
    async getConversations(userId) {
        // Get all unique conversations for the user
        const conversations = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userId },
                    { receiverId: userId }
                ]
            },
            include: {
                sender: { select: { id: true, name: true, avatar: true } },
                receiver: { select: { id: true, name: true, avatar: true } }
            },
            orderBy: { createdAt: "desc" }
        });
        // Group by conversation partner
        const conversationMap = new Map();
        conversations.forEach(message => {
            const partnerId = message.senderId === userId ? message.receiverId : message.senderId;
            const partner = message.senderId === userId ? message.receiver : message.sender;
            if (!conversationMap.has(partnerId)) {
                conversationMap.set(partnerId, {
                    partner,
                    lastMessage: message,
                    unreadCount: 0
                });
            }
            if (message.receiverId === userId && !message.read) {
                conversationMap.get(partnerId).unreadCount++;
            }
        });
        return Array.from(conversationMap.values());
    },
    async getMessages(userId, partnerId) {
        return prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userId, receiverId: partnerId },
                    { senderId: partnerId, receiverId: userId }
                ]
            },
            include: {
                sender: { select: { id: true, name: true, avatar: true } },
                receiver: { select: { id: true, name: true, avatar: true } }
            },
            orderBy: { createdAt: "asc" }
        });
    },
    async markMessagesAsRead(userId, partnerId) {
        return prisma.message.updateMany({
            where: {
                senderId: partnerId,
                receiverId: userId,
                read: false
            },
            data: { read: true }
        });
    }
};
