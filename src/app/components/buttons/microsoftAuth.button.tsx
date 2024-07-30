'use client';

import Image from 'next/image';
import microsoftIcon from '@/public/microsoft.svg';
import { Button } from '@mui/material';

export function MicrosoftAuthButton() {
  const handleClick = () => {
    alert('clicked m');
    //signIn('microsoft');
  };

  return (
    <Button className="w-[115px] h-[50px] shadow-[0_6px_0px_0px_rgba(0,0,0,0.1)] bg-white border-2  border-[#E0E0E0] rounded-[50px] text-center">
      <Image
        src={microsoftIcon}
        width={0}
        height={0}
        alt="Microsoft"
        className="w-full h-[25px]"
        onClick={handleClick}
      />
    </Button>
  );
}
