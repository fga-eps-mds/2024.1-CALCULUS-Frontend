'use client';

import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Divider, IconButton, Typography } from '@mui/material';
import JourneyInfo from '@/components/journey/journeyInfo';
import JourneyPath from '@/components/journey/journeyPath';
import { getJourney, getJourneysByPoint, getTrails } from '@/services/studioMaker.service';
import { Journey } from '@/lib/interfaces/journey.interface';
import { Trail } from '@/lib/interfaces/trails.interface';
import { useParams, useRouter } from 'next/navigation';
import { getSubscribedJourneys, } from '@/services/user.service';
import { useSession } from 'next-auth/react';
import { getCompletedTrails } from '@/services/user.service';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


export default function JourneyPage() {
  const { journeyId } = useParams();
  const router = useRouter();
  const [journey, setJourney] = useState<Journey | null>(null);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasJourney, setHasJourney] = useState(false);
  const { data: session } = useSession();
  const [completedTrails, setCompletedTrails] = useState<string[]>([]);
  const [previousJourney, setPreviousJourney] = useState<Journey | null>(null);
  const [nextJourney, setNextJourney] = useState<Journey | null>(null);

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

        const pointId = journeyData.point;
        if (pointId) {
          const relatedJourneys: Journey[] = await getJourneysByPoint(pointId);
          const next = relatedJourneys.find(j => j.order === journeyData.order + 1);
          if (next != undefined) {
            setNextJourney(next);
            console.log(next);
            console.log(nextJourney);
          }
          const previous = relatedJourneys.find(j => j.order === journeyData.order - 1);
          if (previous != undefined) {
            setPreviousJourney(previous);
            console.log(previous);
            console.log(previousJourney);
          }
        }

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

  const handleNext = async () => {
    router.push(`/journey-page/${nextJourney?._id}`);
  }

  const handlePrevious = async () => {
    router.push(`/journey-page/${previousJourney?._id}`);
  }

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
      position: 'relative',
    }}>
      {(previousJourney) &&
        <IconButton onClick={handlePrevious} sx={{
          position: 'absolute',  
          top: '10%',            
          left: '5%',          
          backgroundColor: '#FF4122',
          height: '40px',
          width: '40px',
          borderRadius: '40px',
          color: '#f1f1f1',
          transform: 'translateY(-50%)',  
          zIndex: 2,
        }}>
          <ArrowBackIcon />
        </IconButton>
      }
    
      {(nextJourney) &&
        <IconButton onClick={handleNext} sx={{
          position: 'absolute',  
          top: '10%',            
          right: '5%',         
          backgroundColor: '#FF4122',
          height: '40px',
          width: '40px',
          borderRadius: '40px',
          color: '#f1f1f1',
          transform: 'translateY(-50%)',  
          zIndex: 2,
        }}>
          <ArrowForwardIcon />
        </IconButton>
      }
    
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#f1f1f1',
          height: 'auto',
          width: '100vw',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box flex={1} pr={2}>
          <JourneyInfo
            title={journey.title}
            description={journey.description}
            trailCount={trails.length}
            hasJourney={hasJourney}
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
            <JourneyPath trails={trails} journeyId={journey._id} hasJourney={hasJourney} />
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
}
