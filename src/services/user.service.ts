import api from './api.service';

export const loginWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  try {
    console.log(`Login email: ${email}, password: ${password}`);
    const response = await api.post('auth/login', { email, password });
    console.log('Login response: ', response);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const googleCallback = async () => {
  const response = await api.get('auth/google/callback');
  return response;
}