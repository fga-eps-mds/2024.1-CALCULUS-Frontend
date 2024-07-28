import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};
