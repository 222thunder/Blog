import React from 'react';
import { Link } from 'react-router-dom';

function PostCard({ _id, title, photo, author, createdAt }) {
  // Use VITE_API_BASE_URL to form absolute image URL if photo is a relative path
  const imageUrl = photo ? `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'}/${photo}` : 'https://via.placeholder.com/400x250?text=No+Image';
  
  return (
    <Link to={`/post/${_id}`} className="block h-full active:scale-[0.98] transition-transform duration-150">
      <div className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 h-full border border-gray-700 hover:border-indigo-500/50">
        <div className="aspect-video w-full overflow-hidden bg-gray-900">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 motion-safe:hover:scale-105"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x250?text=Error+Loading'; }}
          />
        </div>
        <div className="p-5 flex flex-col h-[calc(100%-56.25%)] justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-2 line-clamp-2 tracking-tight">{title}</h2>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
            <span className="truncate">{author?.name || author?.email || 'Anonymous'}</span>
            <span>{new Date(createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
