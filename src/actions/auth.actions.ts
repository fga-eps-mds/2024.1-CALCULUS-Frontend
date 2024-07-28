'use server';
import { signIn, signOut } from '@/auth';

export async function signInEmailPassword(data: any) {
  return await signIn('credentials', {
    email: data.email,
    password: data.password,
    redirect: false,
  });
}

export async function authGoogle() {
  return await signIn('google');
}

export async function endSession() {
  return await signOut();
}
