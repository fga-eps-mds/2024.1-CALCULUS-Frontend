'use client';

import { useSession } from 'next-auth/react';
import { SignOutButton } from '../components/buttons/signOut.button';

export default function HomePage() {
  const session = useSession();

  console.log('my user: ' + session.data?.user);
  return (
    <div>
      <p className="pl-8 pt-4  text-black font-bold text-[#1F1F1F]">
        {session.data?.user.name}
      </p>
      <p className="pl-8 text-black font-bold text-[#1F1F1F]">
        {session.data?.user.email}
      </p>
      <p className=" pl-8 text-black font-bold">
        Esta tela ainda está em desenvolvimento :)
      </p>
      <SignOutButton />
    </div>
  );
}
