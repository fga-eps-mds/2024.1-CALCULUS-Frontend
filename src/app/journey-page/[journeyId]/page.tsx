'use client';

import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import JourneyInfo from '@/components/journey/journeyInfo';
import JourneyPath from '@/components/journey/journeyPath';
import { getJourney, getTrails } from '@/services/studioMaker.service';
import { Journey } from '@/lib/interfaces/journey.interface';
import { Trail } from '@/lib/interfaces/trails.interface';
import { useParams } from 'next/navigation';
import {
  subscribeJourney,
  getSubscribedJourneys,
} from '@/services/user.service';
import { useSession } from 'next-auth/react';
import { getCompletedTrails } from '@/services/user.service';

export default function JourneyPage() {
  const { journeyId } = useParams();
  const [journey, setJourney] = useState<Journey | null>(null);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasJourney, setHasJourney] = useState(false);
  const { data: session } = useSession();
  const [completedTrails, setCompletedTrails] = useState<string[]>([]);

  useEffect(() => {
    const fetchCompletedTrails = async () => {
      if (session?.user.id) {
        try {
          const completed = await getCompletedTrails(session.user.id);
          setCompletedTrails(completed);
        } catch (error) {
          console.error('Error fetching completed trails:', error);
        }
      }
    };
    fetchCompletedTrails();
  }, [session]);

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
          let isSubscribed = false;
          userJourneys.forEach((journeyId: string) => {
            if (journeyId === id) {
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
      await subscribeJourney({
        userId: session.user.id,
        journeyId: id,
        accessToken: session?.user.accessToken,
      });
      setHasJourney(true);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!journey) {
    return <CircularProgress />;
  }

  const completedTrailsInJourney = completedTrails.filter((trailId) =>
    trails.some((trail) => trail._id === trailId),
  );

  return (
    <Box sx={{
      backgroundColor: '#f1f1f1',
      height: '100vh',
    }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#f1f1f1',
          height: 'auto',
          width: '100vw',
          overflow: 'hidden',
        }}
      >
        <Box flex={1} pr={2}>
          <JourneyInfo
            title={journey.title}
            description={journey.description}
            trailCount={trails.length}
            hasJourney={hasJourney}
            onJoin={handleJoin}
            completedTrailsCount={completedTrailsInJourney.length}
          />
        </Box>

        <Divider
          sx={{ marginBottom: '100px', marginTop: '100px' }}
          orientation="vertical"
          variant="middle"
          flexItem
        />
        {!trails.length ? (
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Poppins, sans-serif',
              margin: '250px',
              color: 'silver',
            }}
          >
            Ainda não há trilhas nessa jornada
          </Typography>
        ) : (
          <React.Fragment>
            <JourneyPath trails={trails} />
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
}
