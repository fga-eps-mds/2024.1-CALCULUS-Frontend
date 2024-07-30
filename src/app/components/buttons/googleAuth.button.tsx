'use client';

import Image from 'next/image';
import googleIcon from '@/public/google.svg';
import { Box, Button } from '@mui/material';
import { signIn } from 'next-auth/react';

export function GoogleAuthButton() {
  const handleClick = () => {
    signIn('google');
  };

  return (
    <Button
      className="w-[115px] h-[50px] shadow-[0_6px_0px_0px_rgba(0,0,0,0.1)] bg-[##FFFAFA] border-2  border-[#E0E0E0] rounded-[50px] text-center"
      type="submit"
    >
      <Image
        src={googleIcon}
        width={0}
        height={0}
        onClick={handleClick}
        alt="Google"
        className="w-full h-[25px]"
      />
    </Button>
  );
}
