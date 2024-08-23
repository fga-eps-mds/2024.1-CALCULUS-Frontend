'use client';

import { useSession } from 'next-auth/react';
import JourneyPage from '@/app/components/home/journeyPage';


export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div>
      <div className='m-12 '>
          <JourneyPage />
      </div>
    </div>
  );
}
