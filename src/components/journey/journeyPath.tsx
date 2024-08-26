import React from 'react';
import { Box, Button } from '@mui/material';
import { Trail } from '@/lib/interfaces/trails.interface';

interface JourneyPathProps {
  trails: Trail[];
}

const JourneyPath: React.FC<JourneyPathProps> = ({ trails }) => {
  const nodeSpacing = 120;

  return (
    <Box
      flex={1}
      pl={2}
      sx={{
        position: 'relative',
        height: '500px',
      }}
    >
      {trails.map((trail, index) => (
        <Button
          key={trail._id}
          variant="contained"
          sx={{
            position: 'absolute',
            left: '50%',
            top: `${50 + index * nodeSpacing}px`,
            transform: 'translate(-50%, -50%)',
            padding: '10px',
            backgroundColor: 'lightblue',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            zIndex: 1,
            color: 'black',
            '&:hover': {
              backgroundColor: 'deepskyblue',
            },
          }}
          onClick={() => console.log(`Clicked on trail: ${trail.name}`)} // TODO: Adicionar navegação
        >
          {trail.name}
        </Button>
      ))}
    </Box>
  );
};

export default JourneyPath;
