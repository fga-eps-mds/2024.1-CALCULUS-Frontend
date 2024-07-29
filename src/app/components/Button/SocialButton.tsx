import React from 'react';
import { FcGoogle } from 'react-icons/fc'; // Ícone do Google

interface SocialButtonProps {
  provider: 'google' | 'microsoft';
}

const SocialButton: React.FC<SocialButtonProps> = ({ provider }) => {
  const handleSocialLogin = () => {
    console.log(`Logando com ${provider}`);
  };

  const getButtonIcon = () => {
    switch (provider) {
      case 'google':
        return <FcGoogle className='mr-2' size={24} />;
      case 'microsoft':
        return (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 48 48'
            width='24'
            height='24'
            className='mr-2'
          >
            <path fill='#F25022' d='M6 6h17v17H6z' />
            <path fill='#00A4EF' d='M25 6h17v17H25z' />
            <path fill='#7FBA00' d='M6 25h17v17H6z' />
            <path fill='#FFB900' d='M25 25h17v17H25z' />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <button
      onClick={handleSocialLogin}
      className='w-full flex items-center justify-center px-4 py-2 border rounded-lg text-gray-700 bg-white hover:bg-gray-100 shadow-md'
    >
      {getButtonIcon()}
    </button>
  );
};

export default SocialButton;
