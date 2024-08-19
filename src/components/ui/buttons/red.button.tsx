import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ButtonRed: React.FC<CustomButtonProps> = ({
  onClick,
  children,
  sx,
  ...rest
}) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        fontWeight: 'bold',
        position: 'fixed',
        bottom: 16,
        right: 44,
        bgcolor: 'red',
        color: 'white',
        py: 2,
        px: 4,
        borderRadius: '50px',
        textTransform: 'none',
        minWidth: '200px',
        maxWidth: '300px',
        transition: 'background-color 0.3s',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        '&:hover': { bgcolor: 'darkred' },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ButtonRed;
