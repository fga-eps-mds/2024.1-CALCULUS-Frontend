'use client';

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import PercentIcon from '@mui/icons-material/Percent';
import { PeopleAlt } from '@mui/icons-material';
import MyButton from '@/components/ui/buttons/myButton.component';

interface JourneyInfoProps {
  title: string;
  description: string;
  trailCount: number;
  completionPercentage: number;
  completedStudents: number;
}
const JourneyInfo: React.FC<JourneyInfoProps> = ({
  title,
  description,
  trailCount,
  completionPercentage,
  completedStudents,
}) => {
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
      }}
    ml={20}>
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
          <PercentIcon />
        </Box>

        <Typography variant="body2">
          Porcentagem de conteúdo completada: {completionPercentage}
        </Typography>
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
          <PeopleAlt />
        </Box>

        <Typography variant="body2">
          Alunos que ingressaram a jornada: {completedStudents}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
        ml={55}
      >
        <MyButton width="150px" height="50px" color="red" bold>
          Ingressar
        </MyButton>
      </Box>
    </Box>
  );
};

export default JourneyInfo;
