import { useCallback, useEffect, useState } from 'react'
import { Post } from '../../../entities/post/types'
import api from '../../../shared/lib/api'

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    let mounted = true
    api
      .get<Post[]>('/posts')
      .then((res) => {
        if (mounted) setPosts(res.data)
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('posts load error', err)
      })
    return () => {
      mounted = false
    }
  }, [])

  const addPost = useCallback((post: Post) => {
    setPosts((prev) => [post, ...prev])
  }, [])

  return { posts, addPost }
}
