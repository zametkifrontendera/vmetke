import { Navigation } from '../../shared/ui/Navigation';
import { PostCard } from '../../features/posts/ui/PostCard';
import { usePosts } from '../../features/posts/model';
import { CreatePostForm } from '../../features/createPost/ui/CreatePostForm';
import styles from './styles.module.scss';

export function HomePage() {
  const { posts, addPost } = usePosts();

  return (
    <div className={styles.container}>
      <Navigation />
      <main className={styles.main}>
        <div className={styles.feed}>
          <CreatePostForm onPostCreated={addPost} />
          {posts.length === 0 ? (
            <p className={styles.empty}>Нет постов</p>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>
      </main>
    </div>
  );
}
export default HomePage;
