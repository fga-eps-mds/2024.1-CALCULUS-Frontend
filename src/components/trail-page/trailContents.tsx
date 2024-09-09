'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Content } from '@/lib/interfaces/content.interface';

interface TrailContentProps {
  contents: Content[];
  journeyName: string;
  trailName: string;
  renderContent: (id: string) => void;
  currentContentId: string;
}

const TrailContents: React.FC<TrailContentProps> = ({
  contents,
  journeyName,
  trailName,
  renderContent,
  currentContentId,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        padding: '20px',
        textAlign: 'left',
      }}
    >
      <Typography variant="h6" fontWeight="bold" color="gray" gutterBottom>
        {journeyName}
      </Typography>
      <Typography
        variant="h5"
        color="black"
        fontWeight="bold"
        sx={{ marginBottom: '20px' }}
      >
        {trailName}
      </Typography>

      <Box
        sx={{
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {contents.map((content, index) => {
          const isClickable =
            index <= contents.findIndex((c) => c._id === currentContentId);

          return (
            <Button
              variant="text"
              key={index}
              sx={{
                fontSize: '16px',
                textAlign: 'left',
                color: content._id === currentContentId ? 'black' : 'gray',
                justifyContent: 'flex-start',
                padding: '10px',
              }}
              onClick={() => isClickable && renderContent(content._id)}
              disabled={!isClickable}
            >
              {content.title}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default TrailContents;
