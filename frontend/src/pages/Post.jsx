import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import postService from "../services/post";
import { Container } from "../components";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.author._id === userData._id || post.author === userData._id : false;

  useEffect(() => {
    if (slug) {
      postService.getPost(slug).then((res) => {
        if (res && res.post) setPost(res.post);
        else navigate("/");
      }).catch(() => navigate('/'));
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    if(window.confirm("Are you sure you want to delete this post?")) {
        postService.deletePost(post._id).then((status) => {
          if (status) {
            navigate("/");
          }
        });
    }
  };

  if (!post) return <div className="py-20 text-center text-gray-400">Loading...</div>;

  const imageUrl = post.photo ? (post.photo.startsWith('http') ? post.photo : `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'}/${post.photo}`) : 'https://via.placeholder.com/800x400?text=No+Image';

  return (
    <div className="py-12">
      <Container>
        <div className="w-full flex justify-center mb-8 relative border border-white/10 rounded-xl overflow-hidden bg-gray-900 h-[300px] sm:h-[400px] md:h-[500px]">
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/800x400?text=Error+Loading'; }}
          />

          {isAuthor && (
            <div className="absolute right-6 top-6 flex gap-3 bg-gray-900/80 p-2 rounded-xl backdrop-blur">
              <Link to={`/post/edit/${post._id}`}>
                <button className="bg-green-500 hover:bg-green-600 active:scale-95 px-4 py-2 rounded-lg text-white font-bold transition-all duration-150">
                  Edit
                </button>
              </Link>
              <button className="bg-red-500 hover:bg-red-600 active:scale-95 px-4 py-2 rounded-lg text-white font-bold transition-all duration-150" onClick={deletePost}>
                Delete
              </button>
            </div>
          )}
        </div>
        
        <div className="w-full mb-6">
          <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">{post.title}</h1>
          <div className="text-sm text-gray-400 flex gap-4 border-b border-white/10 pb-4">
             <span>By: {post.author?.name || post.author?.email || 'Anonymous'}</span>
             <span>•</span>
             <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="w-full text-gray-300 leading-relaxed whitespace-pre-wrap text-lg font-serif">
          {post.content}
        </div>
      </Container>
    </div>
  );
}
