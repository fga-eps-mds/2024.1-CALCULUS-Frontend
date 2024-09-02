'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import loadImage from '@/public/loading.gif';
import { CircularProgress } from '@mui/material';

const signInWithToken = async ({
  token,
  refresh,
}: {
  token: string;
  refresh: string;
}) => {
  const result = await signIn('credentials', {
    token,
    refresh,
    redirect: false,
  });
};

const OAuthContent = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [message, setMessage] = useState('Carregando...');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const refresh = searchParams.get('refresh');
  const [isPending, setIsPending] = useState(true);


  useEffect(() => {
    const fetchSession = async () => {
      const result = await signIn('credentials', {
        token,
        refresh,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Erro ao efetuar login, por favor tente novamente!');
        router.push('/login');
      }

      localStorage.setItem('token', JSON.stringify(session?.user.accessToken));
      localStorage.setItem(
        'refresh',
        JSON.stringify(session?.user.refreshToken),
      );
      router.push('/home');
    }
    fetchSession();
  }, [])
  
  if (!token) {
    toast.error('Erro ao efetuar login, por favor tente novamente!');
    router.push('/login');
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {isPending ? <CircularProgress /> : message}
    </div>
  );
};

const OAuthPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <img src={loadImage.src} alt="Carregando..." />
        </div>
      }
    >
      <OAuthContent />
    </Suspense>
  );
};

export default OAuthPage;
