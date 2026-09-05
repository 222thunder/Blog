import React from 'react';
import { Container, PostForm } from '../components';

export default function AddPost() {
  return (
    <div className="py-12">
      <Container>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-8 text-center">Create a New Post</h1>
        <PostForm />
      </Container>
    </div>
  );
}
