'use client';

import robotImage from '@/public/mao_cerebro.png';
import Image from 'next/image';
import SocialButton from '../components/Button/SocialButton';

export default function SignUp() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget as HTMLFormElement);
    console.log({
      email: data.get('email'),
    });
  };

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-white'>
      <div className='flex flex-col md:flex-row justify-center items-center w-full max-w-5xl '>
        <div className='md:w-1/2 flex justify-center mb-8 md:mb-0'>
          <Image src={robotImage} alt='Robot Image' width={400} height={400} />
        </div>
        <div className='md:w-1/2 bg-white p-8 rounded-lg shadow-lg'>
          <h1 className='text-2xl font-bold text-center mb-4 text-gray-800'>
            Cadastre-se gratuitamente e descubra sua jornada de aprendizado.
          </h1>
          <div className='flex space-x-4 justify-center mb-4'>
            <SocialButton provider='google' />
            <SocialButton provider='microsoft' />
          </div>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <input
                type='email'
                name='email'
                id='email'
                required
                className='w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-800'
                placeholder='Email'
              />
            </div>
            <button
              type='submit'
              className='w-full bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800'
            >
              Sign Up
            </button>
          </form>
          <div className='mt-4 text-center'>
            <a href='#' className='text-gray-800 hover:underline'>
              Já possui cadastro? Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
