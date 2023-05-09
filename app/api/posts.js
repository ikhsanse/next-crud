import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const baseUrl = process.env.BASE_URL; // Replace with your API base URL
console.log(baseUrl)
// console.log

// Example GET request
export const fetchPosts = async () => {
  const response = await axios.get(`${baseUrl}/posts?userId=10`);
  return response.data;
};

// Function to delete a post by ID
export const deletePost = async (postId) => {
  const response = await axios.delete(`${baseUrl}/posts/${postId}`);
  return response.data;
};

// Function to create a new post
export const createPost = async (postData) => {
  const response = await axios.post(`${baseUrl}/posts`, postData);
  return response.data;
};

export const updatePost = async (updatedData) => {
  // console.log(updatedData)
  const response = await axios.put(`${baseUrl}/posts/${updatedData.id}`, updatedData);
  return response.data;
};