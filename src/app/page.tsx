'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import roboProfessor from '@/public/robo_professor.png';
import MyButton from '@/components/ui/buttons/myButton.component';
import { useSession } from 'next-auth/react';

export default function LandingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (session) {
      router.push('/home');
    }
  }, [session, router]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fffafa]">
      <header className="w-full flex justify-between p-4">
        <h1 className="text-4xl font-bold text-[#1F1F1F]">Calculus</h1>
        <Link href="/login">
          <MyButton width="120px" height="50px" color="white" bold>
            Login
          </MyButton>
        </Link>
      </header>
      <main className="flex-grow flex flex-col justify-center items-center px-8">
        <div className="flex flex-col md:flex-row items-center justify-center w-full mb-16">
          <div className="md:w-1/2 w-full flex justify-center md:justify-end mb-16 md:mb-0">
            <Image
              src={roboProfessor}
              alt="Robo Professor"
              width={400}
              height={400}
              className="mb-24"
            />
          </div>
          <div className="md:w-1/2 w-full text-center md:text-left md:ml-8">
            <h2 className="text-5xl font-bold text-[#1F1F1F] mb-8">
              Matemática que <br />
              <span className="text-[#6667ab]">Encanta!</span>
            </h2>
            <p className="text-lg text-[#1F1F1F] mb-16 max-w-md mx-auto md:mx-0">
              Tenha acesso a jornadas interativas que transformam o aprendizado
              em diversão.
            </p>
            <div className="flex justify-center md:justify-start">
              <Link href="/register">
                <MyButton width="150px" height="50px" color="red" bold>
                  Comece aqui
                </MyButton>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
