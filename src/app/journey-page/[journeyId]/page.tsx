'use client';

import React, { useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';
import JourneyInfo from '@/components/journey/journeyInfo';
import JourneyPath from '@/components/journey/journeyPath';
import { getJourney, getTrails } from '@/services/studioMaker.service';
import { Journey } from '@/lib/interfaces/journey.interface';
import { Trail } from '@/lib/interfaces/trails.interface';
import { useParams } from 'next/navigation';

export default function JourneyPage() {
  const { journeyId } = useParams();
  const [journey, setJourney] = useState<Journey | null>(null);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJourneyData = async () => {
      try {
        const id = Array.isArray(journeyId) ? journeyId[0] : journeyId;
        const token = JSON.parse(localStorage.getItem('token')!);

        const journeyData = await getJourney(id);
        setJourney(journeyData);

        const trailsData = await getTrails({ id, token });
        setTrails(trailsData);
      } catch (err) {
        setError('Failed to fetch journey data');
      }
    };

    fetchJourneyData();
  }, [journeyId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!journey || !trails.length) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1f1f1',
        height: '100vh',
      }}
    >
      <Box flex={1} pr={2}>
        <JourneyInfo
          title={journey.title}
          description={journey.description}
          trailCount={trails.length}
        />
      </Box>

      <Divider sx={{ height: '80%', marginTop: '100px' }} orientation="vertical" variant="middle" flexItem />

      <JourneyPath trails={trails} />
    </Box>
  );
}
