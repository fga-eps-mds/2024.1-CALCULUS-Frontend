'use client'
import React, { useState, useEffect } from 'react';
import JourneyTable from '@/components/journey/JourneyTable'
import SearchBar from '@/components/admin/SearchBar';
import {
  CircularProgress,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from '@mui/material';

type Journey = {
    _id: string;
    name: string;
    description: string;
  };

const JourneyPage: React.FC = () => {

  return (
    <Box
      sx={{
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
    <Typography variant='h2'>Jornadas</Typography>
    <Box sx={{ width: '100%', maxWidth: 800, marginBottom: 2 }}>
        <SearchBar value={''} onChange={()=>{}} />
    </Box>
    <JourneyTable
        journeys={[]}
        anchorEl= {null}
        onMenuClick={()=>{}}
        onMenuClose={()=>{}}
        onJourneyAction={()=>{}}
      />
    </Box>
  );
};

export default JourneyPage;
