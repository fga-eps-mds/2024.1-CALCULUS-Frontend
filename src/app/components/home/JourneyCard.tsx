'use client'
import React from 'react';
import Image from 'next/image';

interface JourneyCardProps {
    title: string;
    image: string;
}

const JourneyCard: React.FC<JourneyCardProps> = ({ title, image }) => {
    return (
        <div className="bg-[#FFFAFA] border-2 rounded-3xl w-56 h-72 overflow-hidden flex items-center flex-col gap-7 justify-center cursor-pointer">
            <Image src={image} alt={title} width={150} height={150} />
            <h3 className="text-2xl font-bold">{title}</h3>
        </div>
    );
};

export default JourneyCard;