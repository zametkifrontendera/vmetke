import { useEffect, useState } from 'react';
import { Header } from '../../shared/ui/Header';
import { useAppStore } from '../../app/store';
import api from '../../shared/lib/api';
import styles from './styles.module.scss';
import { Conversation, Message } from '../../entities/user/types';

export function MessagesPage() {
  const { user } = useAppStore();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.partner.id);
    }
  }, [selectedConversation]);

  const fetchConversations = async () => {
    try {
      const res = await api.get<Conversation[]>('/messages/conversations');
      setConversations(res.data);
    } catch (err) {
      console.error('Error fetching conversations:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (partnerId: string) => {
    try {
      const res = await api.get<Message[]>(`/messages/${partnerId}`);
      setMessages(res.data);
      // Mark messages as read
      await api.put(`/messages/${partnerId}/read`);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const res = await api.post<Message>('/messages', {
        receiverId: selectedConversation.partner.id,
        content: newMessage.trim()
      });
      
      setMessages(prev => [...prev, res.data]);
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };


  if (loading) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.loading}>Загрузка сообщений...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.messages}>
          <div className={styles.conversations}>
            <h2>Сообщения</h2>
            {conversations.length === 0 ? (
              <p className={styles.empty}>У вас пока нет сообщений</p>
            ) : (
              conversations.map((conversation) => (
                <div
                  key={conversation.partner.id}
                  className={`${styles.conversation} ${
                    selectedConversation?.partner.id === conversation.partner.id ? styles.active : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className={styles.avatar}>
                    {conversation.partner.avatar ? (
                      <img src={conversation.partner.avatar} alt={conversation.partner.name} />
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        {conversation.partner.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className={styles.info}>
                    <div className={styles.name}>{conversation.partner.name}</div>
                    <div className={styles.lastMessage}>
                      {conversation.lastMessage.content}
                    </div>
                  </div>
                  <div className={styles.meta}>
                    <div className={styles.time}>
                      {formatTime(conversation.lastMessage.createdAt)}
                    </div>
                    {conversation.unreadCount > 0 && (
                      <div className={styles.unread}>
                        {conversation.unreadCount}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className={styles.chat}>
            {selectedConversation ? (
              <>
                <div className={styles.chatHeader}>
                  <div className={styles.partnerInfo}>
                    <div className={styles.avatar}>
                      {selectedConversation.partner.avatar ? (
                        <img src={selectedConversation.partner.avatar} alt={selectedConversation.partner.name} />
                      ) : (
                        <div className={styles.avatarPlaceholder}>
                          {selectedConversation.partner.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className={styles.name}>{selectedConversation.partner.name}</div>
                  </div>
                </div>

                <div className={styles.messagesList}>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`${styles.message} ${
                        message.senderId === user?.id ? styles.sent : styles.received
                      }`}
                    >
                      <div className={styles.messageContent}>
                        {message.content}
                      </div>
                      <div className={styles.messageTime}>
                        {formatTime(message.createdAt)}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={sendMessage} className={styles.messageForm}>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Введите сообщение..."
                    className={styles.messageInput}
                  />
                  <button type="submit" className={styles.sendButton}>
                    Отправить
                  </button>
                </form>
              </>
            ) : (
              <div className={styles.noChat}>
                <p>Выберите разговор</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MessagesPage;
