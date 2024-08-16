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
    _id: string;
    name: string;
    description: string;
    owner?: string;
  };

const JourneyPage: React.FC = () => {

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
      
    }
    if(action === 'gerenciar'){
      
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
        anchorEl= {anchorEl}
        onMenuClick={handleMenuOpen}
        onMenuClose={handleMenuClose}
        onJourneyAction={handleJourneyAction}
    />

    {/* <Dialog
            open={editionDialogOpen}
            onClose={handleEdtionDialogClose}
            PaperProps={{
              component: 'form',
              onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries((formData as any).entries());
                const email = formJson.email;
                console.log(email);
                handleEdtionDialogClose();
              },
            }}
          >
            <DialogTitle>Editar</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="email"
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
            <DialogActions>
              <Button onClick={handleEdtionDialogClose}>Cancelar</Button>
              <Button type="submit">Confirmar</Button>
            </DialogActions>
      </Dialog> */}


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
