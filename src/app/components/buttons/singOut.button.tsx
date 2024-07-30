'use client';

import { Box, Button } from '@mui/material';
import { signOut } from 'next-auth/react';

export function SignOutButton() {
  const handleClick = () => {
    signOut();
    window.location.href = '/';
  };
  return (
    <Button
      className="color-red-500 w-[115px] h-[50px] shadow-[0_6px_0px_0px_rgba(0,0,0,0.1)] bg-white border-2  border-[#E0E0E0] rounded-[50px] text-center"
      type="submit"
      onClick={handleClick}
    >
      Sair
    </Button>
  );
}
