'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { toast } from 'sonner';
import loadImage from '@/public/loading.gif';
import { CircularProgress } from '@mui/material';

const OAuthContent = () => {
  const router = useRouter();
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
      setIsPending(false);
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('refresh', JSON.stringify(refresh));
      router.push('/home');
    };
    fetchSession();
  }, []);

  if (!token) {
    toast.error('Erro ao efetuar login, por favor tente novamente!');
    router.push('/login');
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {isPending ? <CircularProgress /> : 'Carregando...'}
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
