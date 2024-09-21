import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../store/postsSlice';
import { VStack, Box, Text } from '@chakra-ui/react';

export default function PostList() {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <VStack spacing={4}>
      {posts.map((post) => (
        <Box key={post._id} p={4} shadow="md" borderWidth="1px">
          <Text fontWeight="bold">{post.author.name}</Text>
          <Text>{post.content}</Text>
        </Box>
      ))}
    </VStack>
  );
}