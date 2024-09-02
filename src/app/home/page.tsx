'use client';

import { useSession } from 'next-auth/react';
import HomePrincipalPage from '@/components/home/homePage';

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="bg-[#F1F1F1] min-h-screen">
      <div className="bg-[#F1F1F1] max-w-7xl mx-auto pt-14 px-5">
        <HomePrincipalPage />
      </div>
    </div>
  );
}
