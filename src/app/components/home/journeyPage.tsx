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
      {userJourneys.length > 0 && (
        <>
          <h5 className="text-3xl font-bold mb-5">Em andamento</h5>
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
      )}
      

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold my-5">Jornadas</h1>
        <SearchBar value={searchQuery} onChange={handleSearch} />
      </div>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        <div className="border mx-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          tristique eleifend lectus a eleifend. Nulla sagittis nibh ultricies
          dolor molestie, vitae euismod neque pretium. Suspendisse potenti. Sed
          nulla odio, ornare vel efficitur in, euismod eu est. Duis dapibus
          fermentum lectus eget fringilla. Praesent dapibus eros sed lectus
          lacinia, at semper erat dictum. Curabitur venenatis pulvinar sem a
          eleifend. Duis vulputate facilisis mattis. Sed a tempus est.
          Pellentesque in augue vehicula, tempus arcu aliquet, facilisis nunc.
          Vivamus convallis ut odio quis vehicula. Ut mattis metus vel tortor
          ullamcorper, at cursus lacus consectetur. Sed mattis consectetur ex,
          vehicula venenatis purus luctus eu. Proin ullamcorper nisi et felis
          fringilla auctor a non urna. Ut ac elit lacus. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Nullam nec tristique tellus.
          Vestibulum sed facilisis nisl, id ullamcorper sem. Etiam venenatis
          ornare ex, at congue mi tincidunt eget. Pellentesque condimentum
          tincidunt orci, nec efficitur est volutpat vitae. Sed rutrum sem
          ligula, ac efficitur lectus efficitur non. Proin ac molestie risus. In
          hac habitasse platea dictumst. Donec sed massa consequat, gravida
          metus in, euismod lorem. Donec posuere mi urna, vel ullamcorper velit
          varius eu. Aliquam sagittis ex eu velit convallis finibus. Vivamus
          ultrices urna ac vehicula mollis.
        </div>
        <div className="border mx-5 h-full">Item 2</div>
        <div className="border mx-5 h-full">Item 3</div>
        <div className="border mx-5 h-full">Item 4</div>
      </Carousel>
    </>
  );
};

export default JourneyPage;
