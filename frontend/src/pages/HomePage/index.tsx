import { Navigation } from '../../shared/ui/Navigation';
import { PostCard } from '../../features/posts/ui/PostCard';
import { usePosts } from '../../features/posts/model';
import styles from './styles.module.scss';

export function HomePage() {
  const posts = usePosts();

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
