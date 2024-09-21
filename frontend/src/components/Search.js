import React, { useState } from 'react';
import { searchUsers } from '../services/api';
import { Input, VStack, Box, Text } from '@chakra-ui/react';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await searchUsers(query);
      setResults(response.data.users);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  return (
    <VStack spacing={4}>
      <Input
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />
      {results.map((user) => (
        <Box key={user._id} p={2} shadow="sm" borderWidth="1px">
          <Text>{user.name} - {user.major} at {user.university}</Text>
        </Box>
      ))}
    </VStack>
  );
}