export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  createdAt: Date;
}

export interface UserProfile extends User {
  posts: Post[];
  friendships1: Friendship[];
  friendships2: Friendship[];
}

export interface Friendship {
  id: string;
  user1Id: string;
  user2Id: string;
  createdAt: Date;
  user1?: User;
  user2?: User;
}

export interface FriendRequest {
  id: string;
  senderId: string;
  receiverId: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
  sender: User;
  receiver: User;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: Date;
  read: boolean;
  sender: User;
  receiver: User;
}

export interface Conversation {
  partner: User;
  lastMessage: Message;
  unreadCount: number;
}

export interface Post {
  id: string;
  content: string;
  likes: number;
  createdAt: Date;
  authorId: string;
  author: {
    id: string;
    name: string;
  };
}