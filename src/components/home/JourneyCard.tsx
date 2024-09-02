'use client';
import React from 'react';
import Image from 'next/image';
import 'react-multi-carousel/lib/styles.css';
import { useRouter } from 'next/navigation';

interface JourneyCardProps {
  title: string;
  image: string;
  Id: string;
}

const JourneyCard: React.FC<JourneyCardProps> = ({ title, image, Id }) => {

  const router = useRouter();
  const handleClick = () => {
    router.push('/journey-page/' + Id);
  } 

  return (
    <div className="bg-[#FFFAFA] border-2 rounded-3xl w-44 h-60 overflow-hidden flex items-center flex-col gap-7 justify-center cursor-pointer" onClick={handleClick}>
      <Image
        src={image}
        alt={title}
        width={120}
        height={120}
        style={{ marginTop: '20px' }}
      />
      <h3 className="text-lg font-bold text-center flex-1">{title}</h3>
    </div>
  );
};

export default JourneyCard;
