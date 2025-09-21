import { useState } from 'react';
import type { Post } from '../../../entities/post/types';
import api from '../../../shared/lib/api';

interface Props {
  onPostCreated: (post: Post) => void;
}

export function CreatePostForm({ onPostCreated }: Props) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      const res = await api.post<Post>('/posts', { content });
      onPostCreated(res.data);
      setContent('');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('create post error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Что у вас нового?"
        rows={4}
      />
      <button
        type="submit"
        disabled={loading}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? 'Публикуем...' : 'Опубликовать'}
      </button>
    </form>
  );
}
export default CreatePostForm;
