import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import postService from '../services/post';

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postService.getPosts().then((res) => {
      if (res && res.posts) {
        setPosts(res.posts);
      }
    }).catch(err => console.error(err)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full py-12">
      <Container>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-8">All Posts</h1>
        {loading ? (
             <div className="text-center text-gray-400 mt-20">Loading posts...</div>
        ) : posts.length === 0 ? (
            <div className="text-center text-gray-400 mt-20">
              <p>No posts found. Be the first to write one!</p>
            </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post) => (
              <div key={post._id}>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
