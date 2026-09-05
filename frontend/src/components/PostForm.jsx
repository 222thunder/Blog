import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import postService from '../services/post';

export default function PostForm({ post }) {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData();
    if (title) formData.append('title', title);
    if (content) formData.append('content', content);
    if (photo) formData.append('photo', photo);

    try {
      if (post) {
        const res = await postService.updatePost(post._id, formData);
        navigate(`/post/${res.post._id}`);
      } else {
        const res = await postService.createPost(formData);
        navigate(`/post/${res.post._id}`);
      }
    } catch (err) {
      setError(err.message || 'Failed to submit post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto flex flex-col gap-6 bg-gray-800 p-8 rounded-xl border border-white/10">
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      <div className="flex flex-col gap-2">
        <label className="text-gray-300 font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 active:scale-[0.98] transition-all duration-150"
          placeholder="Amazing Post Title"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-gray-300 font-medium">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={8}
          className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 active:scale-[0.98] transition-all duration-150"
          placeholder="Write your content here..."
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-gray-300 font-medium">Cover Image {post && "(Leave empty to keep current)"}</label>
        
        {post && post.photo && (
          <div className="w-full h-48 mb-2 rounded-lg overflow-hidden border border-white/10 bg-gray-900">
            <img 
              src={post.photo.startsWith('http') ? post.photo : `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'}/${post.photo}`}
              alt="Current cover" 
              className="w-full h-full object-contain"
            />
          </div>
        )}

        <input
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-2 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 active:scale-[0.98] transition-all duration-150 cursor-pointer"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg active:scale-[0.98] transition-all duration-150 disabled:opacity-50 mt-4"
      >
        {loading ? 'Submitting...' : (post ? 'Update Post' : 'Create Post')}
      </button>
    </form>
  );
}
