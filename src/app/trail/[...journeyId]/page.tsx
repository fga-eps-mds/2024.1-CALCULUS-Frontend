'use client';

import '../../../styles/globals.css';
import TrailsListPage from '../../../components/trailsList';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getJourney, getTrails } from '../../../services/studioMaker.service';
import { Trail } from '@/lib/interfaces/trails.interface';
import { Journey } from '@/lib/interfaces/journey.interface';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function ManageTrack({
  params,
}: {
  readonly params: { journeyId: string };
}) {
  const [jorney, setJorney] = useState<Journey>({} as Journey);
  const fetchTrails = async (): Promise<Trail[]> => {
    let trails = await getTrails({
      id: params.journeyId,
      token: JSON.parse(localStorage.getItem('token')!),
    });
    trails.sort((a, b) => a.order - b.order);
    const jorney = await getJourney(params.journeyId);
    setJorney(jorney);
    return trails;
  };

  const {
    data: trails = [],
    isLoading,
    error,
  } = useQuery<Trail[], Error>({
    queryKey: ['trails', params.journeyId],
    queryFn: fetchTrails,
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography>Error fetching journeys</Typography>;
  }

  return (
    <Box className="flex flex-col items-center mt-8">
      <h1 className="text-blac font-bold text-4xl">{jorney.title}</h1>
      <TrailsListPage trails={trails} journeyId={params.journeyId} />
    </Box>
  );
}
