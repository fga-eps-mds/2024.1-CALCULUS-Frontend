'use client';

import { auth, signOut } from '@/auth';
import { SignOutButton } from './components/buttons/signOutButton';

export default async function Home() {
  const session = await auth();

  const handleSigout = () => {
    console.log('handleSigout');
    
    signOut();
  };

  if (session) {
    return (
      <div className="position-relative">
        <p>Nome: {session?.user.name}</p>
        <p>Email: {session?.user.email}</p>
        <SignOutButton/>
      </div>
    );
  }
  return <div className="position-relative">To na home deslogado meo</div>;
}
