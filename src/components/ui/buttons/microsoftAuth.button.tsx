'use client';

import Image from 'next/image';
import microsoftIcon from '@/public/microsoft.svg';
import { Button } from '@mui/material';
import { signIn } from 'next-auth/react';
import MyButton from '@/components/ui/buttons/myButton.component';

export function MicrosoftAuthButton() {
  const handleClick = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/microsoft/callback`;
    // signIn('azure-ad');
  };

  return (
    <MyButton width="120px" height="55px" color="white" onClick={handleClick}>
      <Image
        src={microsoftIcon}
        width={0}
        height={0}
        alt="Microsoft"
        className="w-full h-[25px]"
        onClick={handleClick}
      />
    </MyButton>
  );
}
