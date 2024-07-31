// page.tsx

'use client';

import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const OAuthContent = () => {
  const { data: session } = useSession();
  const [authenticated, setAuthenticated] = useState(false);
  const [message, setMessage] = useState('Carregando...');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token && !authenticated) {
      const signInWithToken = async () => {
        await signIn('credentials', { token });
        if (session) {
          setAuthenticated(true);
          setMessage('Login efetuado com sucesso! redirecionando');
          await new Promise((resolve) => setTimeout(resolve, 5000));
          window.location.href = '/home';
        }
      };

      signInWithToken();
    }
  }, [token, authenticated, session]);

  return <p>{message}</p>;
};

const OAuthPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OAuthContent />
    </Suspense>
  );
};

export default OAuthPage;
