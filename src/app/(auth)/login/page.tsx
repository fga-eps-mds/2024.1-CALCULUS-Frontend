'use client';

import { Box } from '@mui/material';
import Image from 'next/image';
import calcuclusLogo from '@/public/calculus-logo.svg';
import LoginComponent from '@/app/components/login.component';

export default function LoginPage() {
  return (
    <Box className="h-screen w-screen flex justify-center items-center bg-[#F8F3F3] box-border gap-0">
      <Box className="flex flex-col text-center box-border gap-3 max-h-[900px] justify-self-center">
        <Box className="flex flex-col justify-around mb-2">
          <Image
            className="self-center"
            src={calcuclusLogo}
            alt="Logo"
            width={96}
            height={96}
          />
          <p className="text-[32px] font-bold">Login</p>
        </Box>
        <LoginComponent />
      </Box>
    </Box>
  );
}
