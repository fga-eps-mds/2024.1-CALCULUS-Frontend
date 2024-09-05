'use client';

import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

interface JourneyInfoProps {
  title: string;
  description: string;
  trailCount: number;
  hasJourney: boolean;
  completedTrailsCount: number;
}

const JourneyInfo: React.FC<JourneyInfoProps> = ({
  title,
  description,
  trailCount,
  hasJourney,
  completedTrailsCount,
}) => {

  const progressValue = Math.floor(( completedTrailsCount / trailCount ) * 100);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '25px',
        borderRadius: '20px',
        backgroundColor: '#FFF',
        boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
        maxWidth: '650px',
        marginTop: '100px',
      }}
      ml={20}
    >
      <Typography
        variant="h3"
        fontWeight={'bold'}
        sx={{ fontFamily: 'Poppins, sans-serif' }}
      >
        {title}
      </Typography>

      <Box mb={9} mt={6}>
        <p className="text-2xl">{description}</p>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          alignItems: 'center',
        }}
        mb={1}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <CollectionsBookmarkIcon />
        </Box>

        <Typography variant="body2">Número de trilhas: {trailCount}</Typography>
      </Box>
      {!hasJourney ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          ml={55}
        >
        </Box>
      ) : (
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 2,
              mb: 1,
            }}
          >
            <Typography variant="body2">
              Progresso:
            </Typography>
            <Typography variant="body2">
              {`${progressValue}%`}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progressValue}
            sx={{
              height: '8px',
              borderRadius: '5px',
              backgroundColor: '#e0e0e0', 
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'green',
                borderRadius: '5px', 
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default JourneyInfo;
