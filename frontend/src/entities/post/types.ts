export interface Post {
  id: string
  authorId: string
  author: {
    id: string;
    name: string;
  };
  content: string
  createdAt: Date
  likes: number
}