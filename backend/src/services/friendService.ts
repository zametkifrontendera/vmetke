import prisma from "../models/prismaClient";

export const friendService = {
  async sendFriendRequest(senderId: string, receiverId: string) {
    // Check if already friends
    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { user1Id: senderId, user2Id: receiverId },
          { user1Id: receiverId, user2Id: senderId }
        ]
      }
    });

    if (existingFriendship) {
      throw new Error("Already friends");
    }

    // Check if request already exists
    const existingRequest = await prisma.friendRequest.findFirst({
      where: {
        OR: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId }
        ]
      }
    });

    if (existingRequest) {
      throw new Error("Friend request already exists");
    }

    return prisma.friendRequest.create({
      data: { senderId, receiverId },
      include: {
        sender: { select: { id: true, name: true, avatar: true } },
        receiver: { select: { id: true, name: true, avatar: true } }
      }
    });
  },

  async getFriendRequests(userId: string) {
    return prisma.friendRequest.findMany({
      where: { receiverId: userId, status: "pending" },
      include: {
        sender: { select: { id: true, name: true, avatar: true, bio: true } }
      },
      orderBy: { createdAt: "desc" }
    });
  },

  async respondToFriendRequest(requestId: string, userId: string, action: "accept" | "reject") {
    const request = await prisma.friendRequest.findFirst({
      where: { id: requestId, receiverId: userId, status: "pending" }
    });

    if (!request) {
      throw new Error("Friend request not found");
    }

    if (action === "accept") {
      // Create friendship
      await prisma.friendship.create({
        data: {
          user1Id: request.senderId,
          user2Id: request.receiverId
        }
      });
    }

    // Update request status
    return prisma.friendRequest.update({
      where: { id: requestId },
      data: { status: action === "accept" ? "accepted" : "rejected" }
    });
  },

  async getFriends(userId: string) {
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          { user1Id: userId },
          { user2Id: userId }
        ]
      },
      include: {
        user1: { select: { id: true, name: true, avatar: true, bio: true } },
        user2: { select: { id: true, name: true, avatar: true, bio: true } }
      }
    });

    return friendships.map(friendship => 
      friendship.user1Id === userId ? friendship.user2 : friendship.user1
    );
  },

  async removeFriend(userId: string, friendId: string) {
    const friendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { user1Id: userId, user2Id: friendId },
          { user1Id: friendId, user2Id: userId }
        ]
      }
    });

    if (!friendship) {
      throw new Error("Friendship not found");
    }

    return prisma.friendship.delete({
      where: { id: friendship.id }
    });
  }
};
