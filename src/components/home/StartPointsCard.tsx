'use client';
import React, { useState, useEffect} from 'react';
import Carousel from 'react-multi-carousel';
import Image from 'next/image';
import { ChevronUp, ChevronDown } from 'lucide-react';
import Foto from '@/public/calculus-logo.svg';
import JourneyService from './service/home.services';

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

  useEffect(() => {
    try {
      const loadJourneys = async () => {
        const { fetchJourneybyPoint, fetchJourneyById } = JourneyService();
        const journeysId = await fetchJourneybyPoint(Id);
        const j: any[] = [];
        journeysId.map(async (journeyId: any) => {
          j.push(await fetchJourneyById(journeyId));
        })

        setJourneys(j);
      };
      loadJourneys();
    } catch (error) {
      
    }
  }, []);

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
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="flex gap-3 py-5 px-4 hover:bg-[#ececec] rounded-xl cursor-pointer items-center"
      >
        <Image src={image} alt={title} width={80} height={80} />
        <h3 className="text-xl font-bold text-center w-[40%] ">{title}</h3>
        <p className="text-sm font-light w-[40%] ">{description}</p>
        <div className=" rounded-full h-7 w-7 absolute right-[1%]">
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </div>
      {isOpen && (
        <div className="bg-[#ececec] p-8 rounded-xl">
          <Carousel responsive={responsive}>
            {journeys.map((jornada, index) => (
              <div
                key={index}
                className="h-52 w-58 flex flex-col items-center cursor-pointer "
              >
                <div className="bg-[#FFFAFA] h-40 w-44 flex place-content-center rounded-3xl border-2 border-[#e5e7eb] hover:border-[#dbdbdb]  shadow-[0_6px_0_#e5e7eb] hover:shadow-[0_6px_0_#dbdbdb] relative">
                  <Image
                    src={jornada.img || Foto}
                    alt={jornada.title}
                    width={120}
                    height={120}
                  />
                </div>
                <h3 className="text-xl text-center mt-3">{jornada.title}</h3>

                {index < journeys.length - 1 && (
                  <div className="absolute top-[40%] right-[-30px] w-[60px] h-[3px] bg-[#dbdbdb] z-10"></div>
                )}
              </div>
            ))}
          </Carousel>
        </div>
      )}
      <div className="w-full h-0.5 px my-6 bg-[#dbdbdb]"></div>
    </div>
  );
};

export default StartCard;
