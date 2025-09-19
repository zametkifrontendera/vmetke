import { Post } from '../../../entities/post/types'

export function usePosts(): Post[] {
  return [
    {
      id: '1',
      content: 'Привет, это мой первый пост!',
      authorId: 'user1',
      likes: 10,
      createdAt: new Date('2025-09-19T12:00:00')
    },
    {
      id: '2',
      content: 'Как прекрасен этот мир, посмотри!',
      authorId: 'user2',
      likes: 5,
      createdAt: new Date('2025-09-18T15:30:00')
    }
  ]
}