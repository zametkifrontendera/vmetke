import { create } from 'zustand';
import api from '../../../shared/lib/api';
import { Post } from '../../../entities/post/types';

interface PostsState {
  posts: Post[];
  fetchPosts: () => Promise<void>;
  addPost: (content: string) => Promise<void>;
  updatePost: (id: string, content: string) => Promise<void>;
}

export const usePosts = create<PostsState>((set) => ({
  posts: [],

  fetchPosts: async () => {
    const res = await api.get<Post[]>('/posts');
    set({ posts: res.data });
  },

  addPost: async (content: string) => {
    const res = await api.post<Post>('/posts', { content });
    set((state) => ({
      posts: [res.data, ...state.posts],
    }));
  },

  updatePost: async (id: string, content: string) => {
    const res = await api.put<Post>(`/posts/${id}`, { content });
    set((state) => ({
      posts: state.posts.map((p) => (p.id === id ? res.data : p)),
    }));
  },
}));
