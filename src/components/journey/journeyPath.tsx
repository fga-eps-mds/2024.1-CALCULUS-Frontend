import React from 'react';
import { Box, Button } from '@mui/material';
import { Trail } from '@/lib/interfaces/trails.interface';

interface JourneyPathProps {
  trails: Trail[];
}

const JourneyPath: React.FC<JourneyPathProps> = ({ trails }) => {
  const nodeSpacing = 120;
  const nodeSize = 80;
  const zigzagOffset = 100; 

  return (
    <Box
      flex={1}
      pl={2}
      sx={{
        position: 'relative',
        height: `${trails.length * nodeSpacing + nodeSize}px`,
        backgroundColor: '#f0f0f0',
      }}
    >
      {trails.map((trail, index) => {
        const isLeft = index % 2 === 0;
        const offsetX = isLeft ? -zigzagOffset : zigzagOffset;

        return (
          <Button
            key={trail._id}
            variant="contained"
            sx={{
              position: 'absolute',
              left: `calc(50% + ${offsetX}px)`,
              top: `${50 + index * nodeSpacing}px`,
              width: `${nodeSize}px`,
              height: `${nodeSize}px`,
              backgroundColor: 'lightgray',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              zIndex: 1,
              color: 'black',
              '&:hover': {
                backgroundColor: 'gray',
              },
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              lineHeight: '1.2',
            }}
            onClick={() => console.log(`Clicked on trail: ${trail.name}`)}
          >
            {trail.name}
          </Button>
        );
      })}
    </Box>
  );
};

export default JourneyPath;
