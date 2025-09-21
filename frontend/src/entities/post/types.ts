export interface Post {
  id: string
  author: {
    id: string;
    name: string;
  };
  content: string
  createdAt: Date
  likes: number
}