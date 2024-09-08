'use client';
import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import Image from 'next/image';
import { ChevronUp, ChevronDown } from 'lucide-react';
import Foto from '@/public/calculus-logo.svg';
import JourneyService from './service/home.services';
import { useRouter } from 'next/navigation';

interface StartCardProps {
  title: string;
  image: string;
  description?: string;
  Id: string;
}

const StartCard: React.FC<StartCardProps> = ({
  title,
  image,
  description,
  Id,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [journeys, setJourneys] = useState<any[]>([]);
  const router = useRouter();

  const handleOnclick = (id: string) => {
    router.push('/journey-page/' + id);
  };

  useEffect(() => {
    const loadJourneys = async () => {
      try {
        const { fetchJourneybyPoint, fetchJourneyById } = JourneyService();
        const journeysId = await fetchJourneybyPoint(Id);

        if (!journeysId || journeysId.length === 0) {
          return;
        }

        const j: any[] = [];
        for (const journeyId of journeysId) {
          const journey = await fetchJourneyById(journeyId);
          if (journey) {
            j.push(journey);
          } else {
            console.error(`Journey with ID ${journeyId} not found.`);
          }
        }

        if (j.length === 0) {
          console.error('No valid journeys found.');
        }

        setJourneys(j);
      } catch (error) {
        console.error('Error loading journeys:', error);
      }
    };

    loadJourneys();
  }, [Id]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <div className="w-full my-5 relative">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="flex gap-3 py-5 px-4 hover:bg-[#ececec] rounded-xl cursor-pointer items-center"
      >
        <Image src={image} alt={title} width={80} height={80} />
        <h3 className="text-xl font-bold text-center w-[40%] ">{title}</h3>
        <p className="text-sm font-light w-[40%] ">{description || ''}</p>
        <div className=" rounded-full h-7 w-7 absolute right-[1%]">
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </button>
      {isOpen && (
        <div className="bg-[#ececec] p-8 rounded-xl">
          {journeys.length > 0 ? (
            <Carousel responsive={responsive}>
              {journeys.map((jornada, index) => (
                <div
                  key={index}
                  className="h-52 w-58 flex flex-col items-center cursor-pointer "
                >
                  <button
                    className="bg-[#FFFAFA] h-40 w-44 flex place-content-center rounded-3xl border-2 border-[#e5e7eb] hover:border-[#dbdbdb] shadow-[0_6px_0_#e5e7eb] hover:shadow-[0_6px_0_#dbdbdb] relative"
                    onClick={() => handleOnclick(jornada._id)}
                  >
                    <Image
                      src={jornada.img || Foto}
                      alt={jornada.title}
                      width={120}
                      height={120}
                    />
                  </button>
                  <h3 className="text-xl text-center mt-3">{jornada.title}</h3>

                  {index < journeys.length - 1 && (
                    <div className="absolute top-[40%] right-[-30px] w-[60px] h-[3px] bg-[#dbdbdb] z-10"></div>
                  )}
                </div>
              ))}
            </Carousel>
          ) : (
            <p className="text-center text-gray-500">No journeys available.</p>
          )}
        </div>
      )}
      <div className="w-full h-0.5 px my-6 bg-[#dbdbdb]"></div>
    </div>
  );
};

export default StartCard;
