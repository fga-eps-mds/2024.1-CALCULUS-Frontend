'use server';

import { userApi } from '@/services/apis.service';

export const createUser = async (data: any) => {
  console.log(data);
  try {
    const response = await userApi.post('users', data);
    return {
      data: response.data,
    };
  } catch (error) {
    console.log(error);
    return {
      error: (error as { response: { data: { message: string } } }).response
        ?.data?.message! as string,
    };
  }
};

export const loginWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  try {
    console.log(`Login email: ${email}, password: ${password}`);
    const response = await userApi.post('auth/login', { email, password });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const loginWithFederatedProvider = async (accessToken: string) => {
  try {
    const response = await userApi.post('auth/login/federated', {
      accessToken,
    });
    console.log('Login response: ', response.data);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUsers = async (token: string) => {
  try {
    const response = await userApi.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Users:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};

export const updateUserRole = async (userId: string, newRole: string) => {
  try {
    const response = await userApi.patch(`/users/${userId}/role`, {
      role: newRole,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update user role:', error);
    throw error;
  }
};

export const forgotPassword = async (data: any) => {
  console.log('forgot data', data);
  try {
    const response = await userApi.post('/auth/forgot-password', data);
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (data: any) => {
  console.log('reset data', data);
  try {
    const response = await userApi.put('/auth/reset-password', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
