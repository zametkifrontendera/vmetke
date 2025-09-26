import { useEffect, useState } from 'react';
import { Header } from '../../shared/ui/Header';
import { PostCard } from '../../features/createPost/ui/PostCard';
import api from '../../shared/lib/api';
import styles from './styles.module.scss';
import { UserProfile, User } from '../../entities/user/types';
import { Post } from '../../entities/post/types';

export function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    bio: '',
    avatar: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get<UserProfile>('/users/profile');
      setProfile(res.data);
      setEditData({
        name: res.data.name,
        bio: res.data.bio || '',
        avatar: res.data.avatar || ''
      });
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const res = await api.put<User>('/users/profile', editData);
      setProfile(prev => prev ? { ...prev, ...res.data } : null);
      setEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.loading}>Загрузка...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.error}>Ошибка загрузки профиля</div>
      </div>
    );
  }

  const allFriends = [...profile.friendships1, ...profile.friendships2];

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.profile}>
          <div className={styles.header}>
            <div className={styles.avatar}>
              {profile.avatar ? (
                <img src={profile.avatar} alt={profile.name} />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  {profile.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className={styles.info}>
              {editing ? (
                <div className={styles.editForm}>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                    className={styles.input}
                  />
                  <textarea
                    value={editData.bio}
                    onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="О себе"
                    className={styles.textarea}
                    rows={3}
                  />
                  <input
                    type="url"
                    value={editData.avatar}
                    onChange={(e) => setEditData(prev => ({ ...prev, avatar: e.target.value }))}
                    placeholder="URL аватара"
                    className={styles.input}
                  />
                  <div className={styles.editActions}>
                    <button onClick={handleSave} className={styles.saveBtn}>Сохранить</button>
                    <button onClick={() => setEditing(false)} className={styles.cancelBtn}>Отмена</button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className={styles.name}>{profile.name}</h1>
                  {profile.bio && <p className={styles.bio}>{profile.bio}</p>}
                  <button onClick={() => setEditing(true)} className={styles.editBtn}>
                    Редактировать профиль
                  </button>
                </>
              )}
            </div>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.number}>{profile.posts.length}</span>
              <span className={styles.label}>Постов</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.number}>{allFriends.length}</span>
              <span className={styles.label}>Друзей</span>
            </div>
          </div>

          <div className={styles.posts}>
            <h2>Мои посты</h2>
            {profile.posts.length === 0 ? (
              <p className={styles.empty}>У вас пока нет постов</p>
            ) : (
              profile.posts.map((post: Post) => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;