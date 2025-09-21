import { useEffect, useState } from 'react';
import { Navigation } from '../../shared/ui/Navigation';
import { PostCard } from '../../features/posts/ui/PostCard';
import { fetchPosts } from '../../shared/api/posts';
import { Post } from '../../entities/post/types';
import styles from './styles.module.scss';

export function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts().then(setPosts);
  }, []);

  return (
    <div className={styles.container}>
      <Navigation />
      <main className={styles.main}>
        <div className={styles.feed}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
