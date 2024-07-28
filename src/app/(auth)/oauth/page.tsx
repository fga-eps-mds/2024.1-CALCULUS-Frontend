import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { signIn } from 'next-auth/react';

export default function OAuth() {
  const router = useRouter();
  const { accessToken } = router.query;

  //   useEffect(() => {
  //     if (accessToken) {
  //       signIn('google', { callbackUrl: '/your-redirect-url', accessToken });
  //     }
  //   }, [accessToken]);
}
