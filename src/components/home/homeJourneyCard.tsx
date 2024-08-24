'use client';
import React from 'react';
import Image from 'next/image';
import MyButton from '@/components/ui/buttons/myButton.component';
interface JourneyCardProps {
    type: 'emAndamento' | 'geral';
    title: string;
    image: string;
    description?: string;
    URL?: string;
}

const JourneyCard: React.FC<JourneyCardProps> = ({
    type,
    title,
    image,
    description,
    URL,
}) => {
    if (type === 'emAndamento') {
        return (
            <div className="bg-[#FFFAFA] border-2 rounded-3xl w-44 h-60 overflow-hidden flex items-center flex-col gap-7 justify-center cursor-pointer">
                <Image src={image} alt={title} width={120} height={120} style={{marginTop:"20px"}}/>
                <h3 className="text-lg font-bold text-center flex-1">{title}</h3>
            </div>
        );
    } else {
        return (
        <div className="w-full flex gap-5 justify-between items-center border-b-2 py-4 mb-5">
            <Image src={image} alt={title} width={100} height={100} />
            <h3 className="text-2xl font-bold flex-1">{title}</h3>
            <p className='flex-1'>{description}</p>
            <MyButton color='purple' width='150px' radius='100px' >
                VER TRILHAS
            </MyButton>
        </div>
        );
    }
};

export default JourneyCard;
