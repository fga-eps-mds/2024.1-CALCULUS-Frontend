'use server';

import { signIn } from 'next-auth/react';

export async function signInOAuth(token: string) {
  await signIn('credentials', { token: token });
}
