'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Content } from '@/lib/interfaces/content.interface';

interface TrailContentProps {
  contents: Content[];
  journeyName: string;
  trailName: string;
  renderContent: (id: string) => void;
}

const TrailContents: React.FC<TrailContentProps> = ({
  contents,
  journeyName,
  trailName,
  renderContent,
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

      <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {contents.map((content, index) => (
          <Button
            variant="text"
            key={index}
            sx={{
              fontSize: '16px',
              textAlign: 'left',
              color: 'gray',
              justifyContent: 'flex-start',
            }}
            onClick={() => renderContent(content._id)}
          >
            {content.title}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default TrailContents;
