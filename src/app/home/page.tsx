'use client';

import { useSession } from 'next-auth/react';
import JourneyPage from '@/app/components/home/journeyPage';


export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className='bg-[#F1F1F1]'>
      <div className='max-w-7xl mx-auto pt-14 px-5'>
          <JourneyPage />
      </div>
    </div>
  );
}
