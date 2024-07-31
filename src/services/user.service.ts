import api from './api.service';
import { CalculusRequest } from '@/lib/interfaces/request.interface';

export const createUser = async (data: any): Promise<CalculusRequest> => {
  console.log(`Data: ${data}`);

  try {
    const response = await api.post('users', data);
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
    const response = await api.post('auth/login', { email, password });
    console.log('Login response: ', response.data);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const googleCallback = async () => {
  const response = await api.get('auth/google/callback');
  return response;
};
