'use client';
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  CircularProgress,
  TextField,
} from '@mui/material';
import ButtonRed from '@/components/ui/buttons/red.button';
import SearchBar from '@/components/admin/SearchBar';
import JourneyTable from '@/components/tables/journey.table';
import { Journey } from '@/lib/interfaces/journey.interface';
import { UserRole } from '@/lib/enum/userRole.enum';
import {
  deleteJourney,
  getJourneys,
  getJourneysByUser,
} from '@/services/studioMaker.service';
import Popup from '@/components/ui/popup';
import { CreateJourneyForm } from '@/components/forms/createJourney.form';
import { UpdateJourneyForm } from '@/components/forms/editJourney.form';
import { toast } from 'sonner';

const JourneyPage: React.FC = () => {
  const { data: session } = useSession();
  const fetchJourneys = async (): Promise<Journey[]> => {
    const journeys = !session?.user.role.includes(UserRole.ADMIN)
      ? await getJourneysByUser(session?.user.id!)
      : await getJourneys();
    setListJourneys(journeys);
    setFilteredJourneys(journeys);
    return journeys;
  };

  const {
    data: journeys = [],
    isLoading,

    error,
  } = useQuery<Journey[], Error>({
    queryKey: ['journeys'],
    queryFn: fetchJourneys,
  });

  const [listJourneys, setListJourneys] = useState<Journey[]>([]);
  const [filteredJourneys, setFilteredJourneys] = useState<Journey[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [exclusionDialogOpen, setExclusionDialogOpen] =
    useState<boolean>(false);
  const [editionDialogOpen, setEditionDialogOpen] = useState<boolean>(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredJourneys(listJourneys);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = listJourneys.filter(
        (journey) =>
          journey.title.toLowerCase().includes(lowercasedQuery) ||
          journey.description.toLowerCase().includes(lowercasedQuery),
      );
      setFilteredJourneys(filtered);
    }
  }, [searchQuery, listJourneys]);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    journey: Journey,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedJourney(journey);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleJourneyAction = (action: string) => {
    if (action === 'editar') setEditionDialogOpen(true);
    if (action === 'gerenciar') alert("Redirect to selected journey's trails");
    if (action === 'excluir') setExclusionDialogOpen(true);
  };

  const addJourney = (journey: Journey) => {
    setListJourneys([...listJourneys, journey]);
  };

  const updateJourney = (journey: Journey) => {
    setListJourneys(
      listJourneys.map((j) => (j._id === journey._id ? journey : j)),
    );
  };

  const handleRemoveJourney = async (journey: Journey) => {
    const response = await deleteJourney({
      id: journey._id,
      token: JSON.parse(localStorage.getItem('token')!),
    });
    if (response.data) {
      toast.success('Jornada excluída com sucesso!');
      setListJourneys(listJourneys.filter((j) => j._id !== journey._id));
      setExclusionDialogOpen(false);
    } else {
      toast.error('Erro ao excluir jornada. Tente novamente mais tarde!');
    }
  };

  const handleCloseCreateDialog = () => {
    setCreateDialogOpen(false);
  };
  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography>
        Error fetching journeys: {(error as Error).message}
      </Typography>
    );
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
      <Typography variant="h2">Jornadas</Typography>
      <Box sx={{ width: '100%', maxWidth: 800, marginBottom: 2 }}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </Box>

      <JourneyTable
        journeys={filteredJourneys}
        anchorEl={anchorEl}
        onMenuClick={handleMenuOpen}
        onMenuClose={handleMenuClose}
        onJourneyAction={handleJourneyAction}
      />

      <ButtonRed onClick={() => setCreateDialogOpen(true)}>
        Nova Jornada
      </ButtonRed>

      <Popup
        openPopup={editionDialogOpen}
        setPopup={setEditionDialogOpen}
        title="Editar Jornada"
      >
        <UpdateJourneyForm
          updateJourney={updateJourney}
          journey={selectedJourney!}
          setDialog={setEditionDialogOpen}
        />
      </Popup>

      <Popup
        openPopup={createDialogOpen}
        setPopup={setCreateDialogOpen}
        title="Criar Nova Jornada"
      >
        <CreateJourneyForm
          addJourney={addJourney}
          setDialog={setCreateDialogOpen}
        />
      </Popup>

      <Dialog
        open={exclusionDialogOpen}
        onClose={() => setExclusionDialogOpen(false)}
      >
        <DialogTitle>Confirmar Exclusão de Jornada</DialogTitle>
        <DialogContent>
          {selectedJourney && (
            <Typography variant="h6">{`Excluir ${selectedJourney.title}?`}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExclusionDialogOpen(false)} color="error">
            Cancelar
          </Button>
          <Button
            onClick={() => handleRemoveJourney(selectedJourney!)}
            color="primary"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JourneyPage;
