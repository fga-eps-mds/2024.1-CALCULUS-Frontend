'use client';

import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Foto from '@/public/calculus-logo.svg';
import JourneyCard from '@/components/home/JourneyCard';
import StartCard from '@/components/home/StartPointsCard';
import JourneyService from './service/home.services';
import SearchBar from './SearchBar';
import { useSession } from 'next-auth/react';

const HomePrincipalPage = () => {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userJourneys, setUserJourneys] = useState<any[]>([]);
  const [allPoints, setAllPoints] = useState<any[]>([]);

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        const { fetchUserJourneys, fetchJourneyById } = JourneyService();
        const journeyIds = await fetchUserJourneys(session);

        const journeysDetails = await Promise.all(
          journeyIds.map(async (id: string) => await fetchJourneyById(id)),
        );

        setUserJourneys(journeysDetails.filter((j) => j !== null));
      } catch (error) {
        console.log(error);
      }
    };

    fetchJourneys();
  }, [session]);

  useEffect(() => {
    try {
      const loadPoints = async () => {
        const { fetchPoints } = JourneyService();
        const allPoints = await fetchPoints();
        allPoints!.sort((a, b) => a.order - b.order);
        setAllPoints(allPoints);
      };
      loadPoints();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const filteredPoints =
    searchQuery.length > 0
      ? allPoints.filter(
          (jornada) =>
            jornada.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            jornada.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()),
        )
      : [];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <h5 className="text-3xl font-bold mb-5">Em andamento</h5>
      {userJourneys.length > 0 ? (
        <Carousel responsive={responsive}>
          {userJourneys.map((jornada) => (
            <JourneyCard
              key={jornada._id}
              title={jornada.title}
              image={jornada.image || Foto}
              Id={jornada._id}
            />
          ))}
        </Carousel>
      ) : (
        <div className="border rounded-lg bg-white my-10 w-2/4 p-8 mx-auto">
          <p className="text-2xl font-medium text-center">
            Você ainda não se inscreveu em nenhuma jornada, se inscreva em uma e
            comece agora a aprender
          </p>
        </div>
      )}

      <>
        <div className="flex justify-between items-center mb-6 mt-12">
          <h1 className="text-3xl font-bold my-5">Pontos de partida</h1>
          <SearchBar value={searchQuery} onChange={handleSearch} />
        </div>
        {searchQuery.length > 0 ? (
          <div>
            {filteredPoints.map((jornada) => (
              <StartCard
                key={jornada._id}
                title={jornada.name}
                description={jornada.description}
                image={jornada.image || Foto}
                Id={jornada._id}
              />
            ))}
          </div>
        ) : (
          <div>
            {allPoints.map((jornada) => (
              <StartCard
                key={jornada._id}
                title={jornada.name}
                description={jornada.description}
                image={jornada.image || Foto}
                Id={jornada._id}
              />
            ))}
          </div>
        )}
      </>
    </>
  );
};

export default HomePrincipalPage;
