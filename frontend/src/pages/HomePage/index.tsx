import { useEffect } from 'react';
import { Header } from '../../shared/ui/Header';
import { PostCard } from '../../features/createPost/ui/PostCard';
import { usePosts } from '../../features/posts/model/usePosts';
import { CreatePostForm } from '../../features/createPost/ui/CreatePostForm';
import styles from './styles.module.scss';
import { Post } from '../../entities/post/types';

export function HomePage() {
  const { posts, fetchPosts } = usePosts();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.feed}>
          <CreatePostForm />
          {posts.length === 0 ? (
            <p className={styles.empty}>Нет постов</p>
          ) : (
            posts.map((post: Post) => <PostCard key={post.id} post={post} />)
          )}
        </div>
      </main>
    </div>
  );
}

export default HomePage;
