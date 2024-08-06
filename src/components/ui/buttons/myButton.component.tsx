import { Button, styled } from '@mui/material';
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  color: 'white' | 'black' | 'green' | 'red' | 'purple' | 'pink';
  width?: string;
  height?: string;
  type?: 'button' | 'submit';
  radius?: string;
  onClick?: () => void;
};

const colorMap: { [key: string]: { primary: string; secondary: string } } = {
  white: { primary: '#FFFAFA', secondary: '#CECECE' },
  black: { primary: '#2f2f2f', secondary: '#1F1F1F' },
  green: { primary: '#29CC57', secondary: '#007C23' },
  red: { primary: '#FF4122', secondary: '#C61A09' },
  purple: { primary: '#6667AB', secondary: '#515287' },
  pink: { primary: '#FF8164', secondary: '#FF6242' },
};

const CustomButton = styled(Button)<{
  width?: string;
  height?: string;
  btncolor: string;
  subcolor: string;
  radius?: string;
}>(({ width, height, btncolor, radius, subcolor }) => ({
  width: width || '100%',
  height: height || '50px',
  borderRadius: radius || height || '5px',
  backgroundColor: btncolor,
  border: `1px solid ${subcolor}`,
  boxShadow: `0px 5px 0 ${subcolor}`,
  marginTop: '7px',
  color: btncolor === '#FFFAFA' ? '#000000' : '#FFFFFF',
  '&:hover': {
    backgroundColor: btncolor,
    boxShadow: `0px 5px 0 ${subcolor}`,
  },
}));

const MyButton: React.FC<ButtonProps> = ({ children, color, width, height, type = 'button', radius, onClick }) => {
    return (
      <CustomButton
        variant="contained"
        btncolor={colorMap[color].primary}
        subcolor={colorMap[color].secondary}
        width={width}
        height={height}
        type={type}
        radius={radius}
        onClick={onClick}
      >
        {children}
      </CustomButton>
    );
  };
  
  export default MyButton;
