import { useState } from 'react';
import { usePosts } from '../../posts/model/usePosts';

export function CreatePostForm() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { addPost } = usePosts();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      await addPost(content);
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
