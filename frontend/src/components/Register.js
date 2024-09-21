import React, { useState } from 'react';
import { register } from '../services/api';
import { Button, Input, VStack, Text } from '@chakra-ui/react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    major: '',
    university: '',
    year: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert('Registration successful! Please log in.');
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <Text fontSize="2xl">Register</Text>
        <Input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <Input
          name="major"
          placeholder="Major"
          value={formData.major}
          onChange={handleChange}
        />
        <Input
          name="university"
          placeholder="University"
          value={formData.university}
          onChange={handleChange}
        />
        <Input
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
        />
        <Button type="submit" colorScheme="blue">Register</Button>
      </VStack>
    </form>
  );
}