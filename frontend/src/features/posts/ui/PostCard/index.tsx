import { Post } from '../../../../entities/post/types';
import styles from './styles.module.scss';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.author}>{post.authorId}</span>
        <span className={styles.date}>
          {post.createdAt.toLocaleDateString()}
        </span>
      </div>
      <p className={styles.content}>{post.content}</p>
      <div className={styles.actions}>
        <button className={styles.action}>Лайк ({post.likes})</button>
        <button className={styles.action}>Комментировать</button>
      </div>
    </div>
  );
}
