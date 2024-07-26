import React from 'react';

interface SignUpButtonProps {
  label: string;
  backgroundColor?: string;
  textColor?: string;
  shadowColor?: string;
  onClick?: () => void;
  className?: string;
}

const SignUpButton: React.FC<SignUpButtonProps> = ({
  label,
  backgroundColor = '#2F2F2F', 
  textColor = '#FFFAFA',     
  shadowColor = '#1F1F1F',
  onClick,
  className = '',
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`btn-custom ${className}`} 
      style={{
        backgroundColor,
        color: textColor,
        boxShadow: `0 4px 2px ${shadowColor}`,
      }}
    >
      {label}
    </button>
  );
};

export default SignUpButton;
