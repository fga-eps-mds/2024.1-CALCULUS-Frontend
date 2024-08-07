import { Box, Button } from '@mui/material';
import { signOut } from 'next-auth/react';
import MyButton from './myButton.component';

export function SignOutButton() {
  const handleClick = async () => {
    await signOut();
    window.location.href = '/';
  };
  return (
    <MyButton
      width="115px"
      height="50px"
      color="white"
      type="submit"
      bold
      onClick={handleClick}
    >
      Sair
    </MyButton>
  );
}
