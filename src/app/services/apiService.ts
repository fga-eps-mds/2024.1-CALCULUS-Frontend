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
export const updateUserRole = async (userId: string, newRole: string) => {
  try {
    const response = await axios.patch(`${API_URL}/users/${userId}/role`, {
      role: newRole,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update user role:', error);
    throw error;
  }
};
