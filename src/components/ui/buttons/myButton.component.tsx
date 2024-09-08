import { Button, styled } from '@mui/material';
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  color: 'white' | 'black' | 'green' | 'red' | 'purple' | 'pink';
  width?: string;
  height?: string;
  type?: 'button' | 'submit';
  radius?: string;
  bold?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

const colorMap: {
  [key: string]: { primary: string; secondary: string; hovercolor: string };
} = {
  white: { primary: '#FFFAFA', secondary: '#CECECE', hovercolor: '#F4EDED' },
  black: { primary: '#2F2F2F', secondary: '#1F1F1F', hovercolor: '#252525' },
  green: { primary: '#29CC57', secondary: '#007C23', hovercolor: '#26B54F' },
  red: { primary: '#FF4122', secondary: '#C61A09', hovercolor: '#E93C20' },
  purple: { primary: '#6667AB', secondary: '#515287', hovercolor: '#5D5EA6' },
  pink: { primary: '#FF8164', secondary: '#FF6242', hovercolor: '#E9765B' },
};

const CustomButton = styled(Button)<{
  width?: string;
  height?: string;
  btncolor: string;
  subcolor: string;
  hovercolor: string;
  radius?: string;
  bold?: boolean;
}>(({ width, height, btncolor, radius, subcolor, bold, hovercolor }) => ({
  width: width ?? '100%',
  height: height ?? '50px',
  borderRadius: radius ?? height ?? '5px',
  backgroundColor: btncolor,
  border: `1px solid ${subcolor}`,
  boxShadow: `0px 5px 0 ${subcolor}`,
  marginTop: '7px',
  color: btncolor === '#FFFAFA' ? '#000000' : '#FFFFFF',
  fontWeight: bold ? 'bold' : 'normal',
  '&:hover': {
    backgroundColor: hovercolor,
    boxShadow: `0px 5px 0 ${subcolor}`,
  },
}));

const MyButton: React.FC<ButtonProps> = ({
  children,
  color,
  width,
  height,
  type = 'button',
  radius,
  onClick,
  bold = false,
}) => {
  return (
    <CustomButton
      role="button"
      variant="contained"
      btncolor={colorMap[color].primary}
      subcolor={colorMap[color].secondary}
      hovercolor={colorMap[color].hovercolor}
      width={width}
      height={height}
      type={type}
      bold={bold}
      radius={radius}
      onClick={onClick}
    >
      {children}
    </CustomButton>
  );
};

export default MyButton;
