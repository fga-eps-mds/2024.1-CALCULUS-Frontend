'use client';

import Image from 'next/image';
import googleIcon from '@/public/google.svg';
import MyButton from '@/components/ui/buttons/myButton.component';
export function GoogleAuthButton() {
  const handleClick = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL_USER}/auth/google/callback`;
  };

  return (
    <MyButton width="120px" height="55px" color="white" onClick={handleClick}>
      <Image
        src={googleIcon}
        width={0}
        height={0}
        alt="Google"
        className="w-full h-[25px]"
      />
    </MyButton>
  );
}
