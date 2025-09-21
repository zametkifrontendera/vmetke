import api from '../lib/api'
import { Post } from '../../entities/post/types'

export async function fetchPosts(): Promise<Post[]> {
  const res = await api.get<Post[]>('/posts')
  return res.data
}
