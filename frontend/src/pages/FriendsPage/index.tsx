import { useEffect, useState } from 'react';
import { Header } from '../../shared/ui/Header';
import api from '../../shared/lib/api';
import styles from './styles.module.scss';
import { User, FriendRequest } from '../../entities/user/types';

export function FriendsPage() {
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'search'>('friends');
  const [friends, setFriends] = useState<User[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'friends') {
      fetchFriends();
    } else if (activeTab === 'requests') {
      fetchFriendRequests();
    }
  }, [activeTab]);

  const fetchFriends = async () => {
    try {
      setLoading(true);
      const res = await api.get<User[]>('/friends');
      setFriends(res.data);
    } catch (err) {
      console.error('Error fetching friends:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFriendRequests = async () => {
    try {
      setLoading(true);
      const res = await api.get<FriendRequest[]>('/friends/requests');
      setFriendRequests(res.data);
    } catch (err) {
      console.error('Error fetching friend requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      const res = await api.get<User[]>(`/users/search?q=${encodeURIComponent(query)}`);
      setSearchResults(res.data);
    } catch (err) {
      console.error('Error searching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const sendFriendRequest = async (userId: string) => {
    try {
      await api.post('/friends/request', { receiverId: userId });
      setSearchResults(prev => prev.filter(u => u.id !== userId));
    } catch (err) {
      console.error('Error sending friend request:', err);
    }
  };

  const respondToFriendRequest = async (requestId: string, action: 'accept' | 'reject') => {
    try {
      await api.put(`/friends/request/${requestId}`, { action });
      setFriendRequests(prev => prev.filter(r => r.id !== requestId));
      if (action === 'accept') {
        fetchFriends();
      }
    } catch (err) {
      console.error('Error responding to friend request:', err);
    }
  };

  const removeFriend = async (friendId: string) => {
    try {
      await api.delete(`/friends/${friendId}`);
      setFriends(prev => prev.filter(f => f.id !== friendId));
    } catch (err) {
      console.error('Error removing friend:', err);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchUsers(searchQuery);
  };

  const renderAvatar = (user: User) => {
    if (user.avatar) {
      return <img src={user.avatar} alt={user.name} />;
    }
    return (
      <div className={styles.avatarPlaceholder}>
        {user.name.charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.friends}>
          <div className={styles.header}>
            <h1>Друзья</h1>
            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${activeTab === 'friends' ? styles.active : ''}`}
                onClick={() => setActiveTab('friends')}
              >
                Друзья ({friends.length})
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'requests' ? styles.active : ''}`}
                onClick={() => setActiveTab('requests')}
              >
                Запросы ({friendRequests.length})
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'search' ? styles.active : ''}`}
                onClick={() => setActiveTab('search')}
              >
                Поиск
              </button>
            </div>
          </div>

          <div className={styles.content}>
            {activeTab === 'friends' && (
              <div className={styles.friendsList}>
                {loading ? (
                  <div className={styles.loading}>Загрузка друзей...</div>
                ) : friends.length === 0 ? (
                  <div className={styles.empty}>У вас пока нет друзей</div>
                ) : (
                  friends.map((friend) => (
                    <div key={friend.id} className={styles.friendCard}>
                      <div className={styles.avatar}>
                        {renderAvatar(friend)}
                      </div>
                      <div className={styles.info}>
                        <div className={styles.name}>{friend.name}</div>
                        {friend.bio && <div className={styles.bio}>{friend.bio}</div>}
                      </div>
                      <button
                        onClick={() => removeFriend(friend.id)}
                        className={styles.removeBtn}
                      >
                        Удалить
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'requests' && (
              <div className={styles.requestsList}>
                {loading ? (
                  <div className={styles.loading}>Загрузка запросов...</div>
                ) : friendRequests.length === 0 ? (
                  <div className={styles.empty}>У вас нет новых запросов</div>
                ) : (
                  friendRequests.map((request) => (
                    <div key={request.id} className={styles.requestCard}>
                      <div className={styles.avatar}>
                        {renderAvatar(request.sender)}
                      </div>
                      <div className={styles.info}>
                        <div className={styles.name}>{request.sender.name}</div>
                        <div className={styles.date}>
                          {new Date(request.createdAt).toLocaleDateString('ru-RU')}
                        </div>
                      </div>
                      <div className={styles.actions}>
                        <button
                          onClick={() => respondToFriendRequest(request.id, 'accept')}
                          className={styles.acceptBtn}
                        >
                          Принять
                        </button>
                        <button
                          onClick={() => respondToFriendRequest(request.id, 'reject')}
                          className={styles.rejectBtn}
                        >
                          Отклонить
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'search' && (
              <div className={styles.search}>
                <form onSubmit={handleSearch} className={styles.searchForm}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск пользователей..."
                    className={styles.searchInput}
                  />
                  <button type="submit" className={styles.searchBtn}>
                    Найти
                  </button>
                </form>

                {loading ? (
                  <div className={styles.loading}>Поиск...</div>
                ) : searchResults.length === 0 && searchQuery ? (
                  <div className={styles.empty}>Пользователи не найдены</div>
                ) : (
                  <div className={styles.searchResults}>
                    {searchResults.map((user) => (
                      <div key={user.id} className={styles.userCard}>
                        <div className={styles.avatar}>
                          {renderAvatar(user)}
                        </div>
                        <div className={styles.info}>
                          <div className={styles.name}>{user.name}</div>
                          {user.bio && <div className={styles.bio}>{user.bio}</div>}
                        </div>
                        <button
                          onClick={() => sendFriendRequest(user.id)}
                          className={styles.addBtn}
                        >
                          Добавить
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default FriendsPage;
