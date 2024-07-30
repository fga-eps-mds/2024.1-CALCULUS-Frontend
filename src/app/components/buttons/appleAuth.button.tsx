'use client';

import Image from 'next/image';
import appleIcon from '@/public/apple.svg';
import { Button } from '@mui/material';

export function AppleAuthButton() {
  const handleClick = () => {
    alert('Ops, ainda estamos trabalhando nessa funcionalidade');
    //signIn('apple');
  };

  return (
    <Button className="w-[115px] h-[50px] shadow-[0_6px_0px_0px_rgba(0,0,0,0.1)] bg-[##FFFAFA] border-2  border-[#E0E0E0] rounded-[50px] text-center">
      <Image
        src={appleIcon}
        width={0}
        height={0}
        alt="Apple"
        className="w-full h-[25px]"
        onClick={handleClick}
      />
    </Button>
  );
}
