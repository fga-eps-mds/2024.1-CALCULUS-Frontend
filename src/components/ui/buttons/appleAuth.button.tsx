'use client';

import Image from 'next/image';
import appleIcon from '@/public/apple.svg';
import { Button } from '@mui/material';
import MyButton from '@/components/ui/buttons/myButton.component';

export function AppleAuthButton() {
  const handleClick = () => {
    alert('Ops, ainda estamos trabalhando nessa funcionalidade');
    //signIn('apple');
  };

  return (
    <MyButton width="120px" height="55px" color="white">
      <Image
        src={appleIcon}
        width={0}
        height={0}
        alt="Apple"
        className="w-full h-[25px]"
        onClick={handleClick}
      />
    </MyButton>
  );
}
