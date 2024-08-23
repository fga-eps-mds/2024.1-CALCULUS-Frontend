import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Foto from '@/public/calculus-logo.svg';
import JourneyCard from '@/app/components/home/JourneyCard';
import JourneyService from './service/journey.services';
import SearchBar from './SearchBar';
import { useSession } from 'next-auth/react';

const JourneyPage = () => {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userJourneys, setUserJourneys] = useState<any[]>([]);

  useEffect(() => {
    const fetchJourneys = async () => {
      const { fetchUserJourneys, fetchJourneyById } = JourneyService();
      const journeyIds = await fetchUserJourneys(session);
      
      const journeysDetails = await Promise.all(
        journeyIds.map(async (id: string) => await fetchJourneyById(id))
      );

      setUserJourneys(journeysDetails.filter(j => j !== null)); // Filtrar jornadas que foram encontradas


    };

    fetchJourneys();
  }, [session]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <>
      <h5 className="text-3xl font-bold mb-5">Em andamento</h5>
      {userJourneys.length > 0 ? (
        <>
          <Carousel
            className="mb-24"
            responsive={responsive}
            itemClass="carousel-item-padding-40-px"
          >
            {userJourneys.map((jornada) => (
              <JourneyCard
                type='emAndamento'
                key={jornada._id}
                title={jornada.title}
                image={jornada.image || Foto}
              />
            ))}
          </Carousel>
        </>
      ) : (
        
        <div className="border rounded-lg bg-white my-10 w-2/4 p-8 mx-auto">
          <p className="text-2xl font-medium text-center">Você ainda não se inscreveu em nenhuma jornada, se inscreva em uma e comece agora a aprender</p>
        </div>
      )}
      

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold my-5">Jornadas</h1>
        <SearchBar value={searchQuery} onChange={handleSearch} />
      </div>
      
    </>
  );
};

export default JourneyPage;
