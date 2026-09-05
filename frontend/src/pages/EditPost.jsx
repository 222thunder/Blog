import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import postService from '../services/post';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams(); // Using slug/id interchangeably here as param name
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      postService.getPost(slug).then((res) => {
        if (res && res.post) {
          setPost(res.post);
        } else {
          navigate('/');
        }
      }).catch(() => navigate('/')).finally(() => setLoading(false));
    } else {
      navigate('/');
    }
  }, [slug, navigate]);

  return (
    <div className="py-12">
      <Container>
         <h1 className="text-3xl font-bold text-white tracking-tight mb-8 text-center">Edit Post</h1>
         {loading ? <div className="text-center text-gray-400">Loading...</div> : <PostForm post={post} />}
      </Container>
    </div>
  );
}
