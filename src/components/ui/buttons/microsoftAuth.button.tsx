'use client';

import Image from 'next/image';
import microsoftIcon from '@/public/microsoft.svg';
import MyButton from '@/components/ui/buttons/myButton.component';

export function MicrosoftAuthButton() {
  const handleClick = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL_USER}/auth/microsoft/callback`;
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
