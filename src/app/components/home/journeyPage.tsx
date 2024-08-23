import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import React, { useState } from 'react';
import JourneyCard from '@/app/components/home/JourneyCard';
import Foto from '@/public/calculus-logo.svg';
import SearchBar from './SearchBar';

const JourneyPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (query: string) => {
    console.log(query);
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

  const EmAndamento = {
    jornadas: [
      {
        title: 'Jornada 1',
        image: Foto,
      },
      {
        title: 'Jornada 2',
        image: Foto,
      },
      {
        title: 'Jornada 3',
        image: Foto,
      },
      {
        title: 'Jornada 4',
        image: Foto,
      },
      {
        title: 'Jornada 5',
        image: Foto,
      },
      {
        title: 'Jornada 6',
        image: Foto,
      },
      {
        title: 'Jornada 7',
        image: Foto,
      },
      {
        title: 'Jornada 8',
        image: Foto,
      },
      {
        title: 'Jornada 9',
        image: Foto,
      },
    ],
  };

  const Geral = {
    jornadas: [
      {
        title: 'Jornada 1',
        image: Foto,
        description: 'Descrição da jornada',
      },
      {
        title: 'Jornada 2',
        image: Foto,
        description: 'Descrição da jornada maior para teste dwad wa dwa dwa dwawdwadw dwadsdw dwad wa',
      },
      {
        title: 'Jornada 3',
        image: Foto,
        description: 'Descrição da jornada',
      },
      {
        title: 'Jornada 4',
        image: Foto,
        description: 'Descrição da jornada',
      },
      {
        title: 'Jornada 5',
        image: Foto,
        description: 'Descrição da jornada',
      },
    ],
  };

  return (
    <>
      {/* se usuario possui jornadas em andamento, aparece aba de "Em andamento"*/}
      <h5 className="text-3xl font-bold mb-5">Em andamento</h5>
      <Carousel
        className="mb-24"
        responsive={responsive}
        itemClass="carousel-item-padding-40-px"
      >
        {EmAndamento.jornadas.map((jornada) => (
          <JourneyCard
            type="emAndamento"
            key={jornada.title}
            title={jornada.title}
            image={jornada.image}
          />
        ))}
      </Carousel>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold my-5">Jornadas</h1>
          <SearchBar value={searchQuery} onChange={handleSearch} />
        </div>
        <div>
          {Geral.jornadas.map((jornada) => (
            <JourneyCard
              type="geral"
              key={jornada.title}
              title={jornada.title}
              image={jornada.image}
              description={jornada.description}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default JourneyPage;
