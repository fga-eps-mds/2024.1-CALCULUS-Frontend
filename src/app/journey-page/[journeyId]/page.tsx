'use client';

import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Divider } from '@mui/material';
import JourneyInfo from '@/components/journey/journeyInfo';
import JourneyPath from '@/components/journey/journeyPath';
import { addJourneyToUser, getJourney, getJourneysByUser, getTrails } from '@/services/studioMaker.service';
import { Journey } from '@/lib/interfaces/journey.interface';
import { Trail } from '@/lib/interfaces/trails.interface';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { subscribeJourney, getSubscribedJourneys } from '@/services/user.service';

export default function JourneyPage() {
  const { journeyId } = useParams();
  const [journey, setJourney] = useState<Journey | null>(null);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasJourney, setHasJourney] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchJourneyData = async () => {
      try {
        const id = Array.isArray(journeyId) ? journeyId[0] : journeyId;
        const token = JSON.parse(localStorage.getItem('token')!);

        const journeyData = await getJourney(id);
        setJourney(journeyData);

        const trailsData = await getTrails({ id, token });
        setTrails(trailsData);

        if (session?.user?.id) {
          const userJourneys = await getSubscribedJourneys(session.user.id);
          console.log('User journeys: ', userJourneys);
          let isSubscribed = false;
          userJourneys.forEach(journeyId => {
            if(journeyId === id) {
                isSubscribed = true;
            }
          });
          setHasJourney(isSubscribed);
        }
      } catch (err) {
        setError('Failed to fetch journey data');
      }
    };

    fetchJourneyData();
  }, [journeyId, session?.user?.id]);

  const handleJoin = async () => {
    if (session?.user.id) {
      const id = Array.isArray(journeyId) ? journeyId[0] : journeyId; 
      console.log(session?.user.accessToken);
      await subscribeJourney({ userId: session.user.id, journeyId: id, accessToken: session?.user.accessToken});
      setHasJourney(true); 
    }

    
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!journey || !trails.length) {
    return <CircularProgress />;
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
          hasJourney={hasJourney}
          onJoin={handleJoin}
        />
      </Box>

      <Divider sx={{ height: '80%', marginTop: '100px' }} orientation="vertical" variant="middle" flexItem />

      <JourneyPath trails={trails} />
    </Box>
  );
}
