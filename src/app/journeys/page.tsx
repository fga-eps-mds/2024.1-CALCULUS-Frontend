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
  TextField,
} from '@mui/material';

type Journey = {
    title: string;
    description: string;
    user?: string;
  };

const JourneyPage: React.FC = () => {

  const journeyTestArray = [{title: '1', description:'description1'}, {title:'2', description:'description2'}, {title: '3', description:'description3'}, {title: '11', description:'description1'}];

  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [filteredJourneys, setfilteredJourneys] = useState<Journey[]>([]);
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [exclusionDialogOpen, setExclusionDialogOpen] = useState<boolean>(false);
  const [editionDialogOpen, seteditionDialogOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /* const fetchJourneys = async () => {};
    fetchJourneys(); */
    setJourneys(journeyTestArray);
    setfilteredJourneys(filteredJourneys);
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const newFilteredJourneys = journeys.filter(
      (journey) =>
        journey.title.toLowerCase().includes(lowercasedQuery) ||
        journey.description.toLowerCase().includes(lowercasedQuery),
    );
    setfilteredJourneys(newFilteredJourneys);
  }, [searchQuery, journeys]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, journey: Journey) => {
    setAnchorEl(event.currentTarget);
    setSelectedJourney(journey);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedJourney(null);
  };

  const handleEdtionDialogClose = () => {
    seteditionDialogOpen(false);
    handleMenuClose();
  };

  const handleJourneyAction = (action: string) => {
    if(action === 'editar'){
      seteditionDialogOpen(true);
    }
    if(action === 'gerenciar'){
      alert("to redirect to selected journey's trails");
    }
    if(action === 'excluir'){
      setExclusionDialogOpen(true);
    }
  }

  const cancelJourneyExclusion = () => {
    setExclusionDialogOpen(false);
    handleMenuClose();
  }

  const excludeJourney = () => {
    if(selectedJourney){
      alert('to exclude journey');
      setExclusionDialogOpen(false);
      setAnchorEl(null);
    }
  }

  const handleNewJourney = () => {
    alert('to create a new journey');
  }

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
      <SearchBar value={searchQuery} onChange={handleSearch} />
    </Box>

    <JourneyTable
        journeys={filteredJourneys}
        anchorEl= {anchorEl}
        onMenuClick={handleMenuOpen}
        onMenuClose={handleMenuClose}
        onJourneyAction={handleJourneyAction}
    />

    <Dialog
            open={editionDialogOpen}
            onClose={handleEdtionDialogClose}
            PaperProps={{
              component: 'form',
              onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                if(selectedJourney){
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const formJson = Object.fromEntries((formData as any).entries());
                  const title = formJson.title;
                  const description = formJson.description;
                  console.log(`${title}  ${description}`);
                  alert('to edit selected journey')
                  handleEdtionDialogClose();
                }
              },
            }}
          >
            <DialogTitle>Editar Jornada</DialogTitle>
              <DialogContent>
                <TextField
                  name='title'
                  fullWidth
                  variant="outlined"
                  label="Nome da Jornada"
                  margin="normal"
                  type='text'
                  required
                  sx={{ bgcolor: 'white' }}
                />
                <TextField
                  name='description'
                  fullWidth
                  variant="outlined"
                  label="Breve descrição da jornada"
                  margin="normal"
                  type='text'
                  sx={{ bgcolor: 'white' }}
                  multiline
                  rows={4}
                  maxRows={8}
                />
              </DialogContent>
            <DialogActions>
              <Button onClick={handleEdtionDialogClose}>Cancelar</Button>
              <Button type="submit">Confirmar</Button>
            </DialogActions>
      </Dialog>

    <Button
        onClick={handleNewJourney}
        variant="contained"
        sx={{
          fontWeight: 'bold',
          position: 'fixed',
          bottom: 16,
          right: 44,
          bgcolor: 'red',
          color: 'white',
          py: 2,
          px: 4,
          borderRadius: '50px',
          textTransform: 'none',
          width: 'auto',
          minWidth: '200px',
          maxWidth: '300px',
          transition: 'background-color 0.3s',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          '&:hover': {
            bgcolor: 'darkred',
          },
        }}
      >
        Nova Jornada
    </Button>

    <Dialog open={exclusionDialogOpen} onClose={cancelJourneyExclusion}>
        <DialogTitle>Confirmar Exclusão de Jornada</DialogTitle>
        <DialogContent>
          {selectedJourney && (
            <Typography variant="h6">
              {`Excluir ${selectedJourney.title}?`}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelJourneyExclusion} color="error">
            Cancelar
          </Button>
          <Button onClick={excludeJourney} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default JourneyPage;
