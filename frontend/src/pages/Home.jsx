import React, { useEffect, useState } from "react";
import postService from "../services/post";
import { Container, PostCard } from "../components";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postService
      .getPosts()
      .then((res) => {
        if (res && res.posts) {
          setPosts(res.posts.slice(0, 4)); // Show only latest 4 on home
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full py-16">
      <Container>
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-white mb-6 tracking-tight">
            Welcome to Sanyam's Blog
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto tracking-normal">
            Discover thoughts, ideas, and stories from our creative community.
            Join us to start sharing your own.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/posts"
              className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-500 active:scale-95 transition-all duration-150"
            >
              Read All Posts
            </Link>
            <Link
              to="/post/create"
              className="bg-gray-800 text-white px-6 py-3 rounded-full font-semibold border border-white/10 hover:bg-gray-700 active:scale-95 transition-all duration-150"
            >
              Start Writing
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4 tracking-tight">
            Latest Posts
          </h2>
          {loading ? (
            <div className="text-center text-gray-400">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-center text-gray-400">
              <p>No posts available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {posts.map((post) => (
                <div key={post._id} className="h-full">
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
