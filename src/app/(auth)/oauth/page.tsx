'use client';

import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { signInOAuth } from '@/lib/auth.actions';

export default function OAuth() {
  const session = useSession();
  const [authenticated, setAuthenticated] = useState(false);
  const [message, setMessage] = useState('Carregando...');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token && !authenticated) {
      const signInWithToken = async () => {
        await signIn('credentials', { token: token });
        if (session.data) {
          setAuthenticated(true);
          setMessage('Login efetuado com sucesso! redirecionando');
          await setTimeout(() => {}, 5000);
          window.location.href = '/home';
        }
      };

      signInWithToken();
    }
  }, [session.data]);

  return (
    <>
      <p>{message}</p>
    </>
  );
}
