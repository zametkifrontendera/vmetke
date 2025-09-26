import { useState } from 'react';
import { Post } from '../../../../entities/post/types';
import { useAppStore } from '../../../../app/store';
import { usePosts } from '../../../posts/model/usePosts';
import styles from './styles.module.scss';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { user } = useAppStore();
  const isAuthor = user?.id === post.author.id;
  const { updatePost } = usePosts();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(post.content);

  const onSave = async () => {
    const trimmed = draft.trim();
    if (!trimmed || trimmed === post.content) {
      setIsEditing(false);
      setDraft(post.content);
      return;
    }
    await updatePost(post.id, trimmed);
    setIsEditing(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.author}>{post.author.name}</span>
        <span className={styles.date}>
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>
      {isEditing ? (
        <div className={styles.editWrap}>
          <textarea
            className={styles.editArea}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
          />
          <div className={styles.editActions}> 
            <button className={styles.action} onClick={onSave}>Сохранить</button>
            <button className={styles.action} onClick={() => { setIsEditing(false); setDraft(post.content); }}>Отмена</button>
          </div>
        </div>
      ) : (
        <p className={styles.content}>{post.content}</p>
      )}
      <div className={styles.actions}>
        <button className={styles.action}>Лайк ({post.likes})</button>
        <button className={styles.action}>Комментировать</button>
        {isAuthor && !isEditing && (
          <button className={styles.action} onClick={() => setIsEditing(true)}>Редактировать</button>
        )}
      </div>
    </div>
  );
}
