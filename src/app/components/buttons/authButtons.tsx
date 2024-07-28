'use client'; // Ensure this is at the top of your file

import { IconButton } from '@mui/material';
import Image from 'next/image';
import googleIcon from '@/public/googleIcon.svg';
import { signIn } from '@/auth';

export function GoogleAuthButton() {
  const handleClick = () => {
    signIn('google');
  };

  return (
    <IconButton onClick={handleClick} size="large" color="inherit">
      <Image src={googleIcon} alt="Google Icon" width={20} height={20} />
    </IconButton>
  );
}
