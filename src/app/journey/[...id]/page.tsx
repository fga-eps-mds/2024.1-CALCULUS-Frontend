'use client';

import '../../../styles/globals.css';
import JorneyTrailsListPage from '../../../components/jorneyTrailsList';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getJourney, getTrails } from '../../../services/studioMaker.service';
import { Trail } from '@/lib/interfaces/trails.interface';
import { Journey } from '@/lib/interfaces/journey.interface';
import { useState } from 'react';

export default function ManageTrack({ params }: { params: { id: string } }) {
  const [jorney, setJorney] = useState<Journey>({} as Journey);
  const fetchTrails = async (): Promise<Trail[]> => {
    var trails = await getTrails({
      id: params.id,
      token: JSON.parse(localStorage.getItem('token')!),
    });
    // sorting
    for (var j=0;j<trails.length;j++){
      for (var i=0;i<trails.length- j-1;i++){
        if (trails[i].order>trails[i+1].order){
          var temp = trails[i]
          trails[i] = trails[i+1]
          trails[i+1] = temp
        }
      }
    }
    console.log(`organizado: ${trails}`)
    const jorney = await getJourney(params.id);
    setJorney(jorney);
    return trails;
  };

  
  const {
    data: trails = [],
    isLoading,
    error,
  } = useQuery<Trail[], Error>({
    queryKey: ['trails'],
    queryFn: fetchTrails,
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography>
        Error fetching journeys: {(error as Error).message}
      </Typography>
    );
  }

  return (
    <>
      <Box className="flex flex-col items-center mt-8">
        <h1 className="text-blac font-bold text-4xl">{jorney.title}</h1>
        <JorneyTrailsListPage trails={trails} journeyId={params.id} />
      </Box>
    </>
  );
}
