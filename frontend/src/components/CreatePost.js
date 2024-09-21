import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createPost } from '../services/api';
import { Button, Textarea, VStack, Text } from '@chakra-ui/react';

export default function CreatePost() {
  const [content, setContent] = useState('');
  const token = useSelector((state) => state.auth.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost(content);
      setContent('');
      alert('Post created successfully!');
      // You might want to refresh the post list here
    } catch (err) {
      console.error('Failed to create post:', err);
      alert('Failed to create post. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <Text fontSize="xl">Create a New Post</Text>
        <Textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="submit" colorScheme="blue">Post</Button>
      </VStack>
    </form>
  );
}