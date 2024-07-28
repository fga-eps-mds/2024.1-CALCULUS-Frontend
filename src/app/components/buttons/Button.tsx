import React from 'react';

interface ButtonProps {
  label: string;
  backgroundColor?: string;
  textColor?: string;
  shadowColor?: string;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  backgroundColor = '#FF4122',
  textColor = '#FFFAFA',
  shadowColor = '#C61A09',
  onClick,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn-custom ${className}`}
      style={{
        backgroundColor,
        color: textColor,
        boxShadow: `0 4px 6px ${shadowColor}`,
      }}
    >
      {label}
    </button>
  );
};

export default Button;
