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
    /* _id: string;
    name: string;
    description: string;
    owner?: string; */
    name: string;
    description: string;
  };

const JourneyPage: React.FC = () => {

  const journeyTestArray = [{name: '1', description:'description1'}, {name:'2', description:'description2'}, {name: '3', description:'description3'}];

  const [journey, setJourney] = useState<Journey[]>([]);
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [exclusionDialogOpen, setExclusionDialogOpen] = useState<boolean>(false);
  const [editionDialogOpen, seteditionDialogOpen] = useState<boolean>(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdtionDialogOpen = () => {
    seteditionDialogOpen(true);
  };

  const handleEdtionDialogClose = () => {
    seteditionDialogOpen(false);
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
  }

  const excludeJourney = () => {
    alert('to exclude journey');
    setExclusionDialogOpen(false);
    setAnchorEl(null);
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
        <SearchBar value={''} onChange={()=>{}} />
    </Box>

    <JourneyTable
        journeys={journeyTestArray}
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
                handleEdtionDialogClose();
              },
            }}
          >
            <DialogTitle>Editar Jornada</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  name="journeyName"
                  label="Nome da Jornada"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="dense"
                  name="journeyDescription"
                  label="Breve descrição"
                  type="text"
                  fullWidth
                  variant="standard"
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
              {`Excluir ${selectedJourney.name}?`}
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
