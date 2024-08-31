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
} from '@mui/material';
import ButtonRed from '@/components/ui/buttons/red.button';
import SearchBar from '@/components/admin/SearchBar';
import StartpointTable from '@/components/tables/startingpoints.table'
import { StartPoint } from '@/lib/interfaces/startPoint.interface';
import { UserRole } from '@/lib/enum/userRole.enum';
import {
  deleteStartPoint,
  getStartPoints,
  getStartPointsByUser,
} from '@/services/studioMaker.service';
import Popup from '@/components/ui/popup';
import { toast } from 'sonner';
import { CreateStartPointForm } from '@/components/forms/createStartPoint.form';
import { UpdateStartPointForm } from '@/components/forms/editStartPoint.form';

const StartPointPage: React.FC = () => {

  const { data: session } = useSession();
  const fetchStartPoints = async (): Promise<StartPoint[]> => {
    const startPoints = !session?.user.role.includes(UserRole.ADMIN)
      ? await getStartPointsByUser(session?.user.id!)
      : await getStartPoints();
    setListStartPoints(startPoints);
    setFilteredStartPoints(startPoints);
    return startPoints;
  };

  const {
    data = [],
    isLoading,

    error,
  } = useQuery<StartPoint[], Error>({
    queryKey: ['startpoints', session?.user.id],
    queryFn: fetchStartPoints,
  });

  const [listStartPoints, setListStartPoints] = useState<StartPoint[]>([]);
  const [filteredStartPoints, setFilteredStartPoints] = useState<StartPoint[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedStartPoint, setSelectedStartPoint] = useState<StartPoint | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [exclusionDialogOpen, setExclusionDialogOpen] = useState<boolean>(false);
  const [editionDialogOpen, setEditionDialogOpen] = useState<boolean>(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredStartPoints(listStartPoints);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = listStartPoints.filter(
        (startPoint) =>
          startPoint.name.toLowerCase().includes(lowercasedQuery) ||
          startPoint.description.toLowerCase().includes(lowercasedQuery),
      );
      setFilteredStartPoints(filtered);
    }
  }, [searchQuery, listStartPoints]);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    startPoint: StartPoint,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedStartPoint(startPoint);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStartPointAction = (action: string) => {
    if (action === 'editar') setEditionDialogOpen(true);
    if (action === 'excluir') setExclusionDialogOpen(true);
  };

  const addStartPoint = (startPoint: StartPoint) => {
    setListStartPoints([...listStartPoints, startPoint]);
  };

  const updateStartPoint = (startPoint: StartPoint) => {
    setListStartPoints(
      listStartPoints.map((p) => (p._id === startPoint._id ? startPoint : p)),
    );
  };

  const handleRemoveStartPoint = async (startPoint: StartPoint) => {
    const response = await deleteStartPoint({
      id: startPoint._id,
      token: JSON.parse(localStorage.getItem('token')!),
    });
    if (response.data) {
      toast.success('Ponto de partida excluído com sucesso!');
      setListStartPoints(listStartPoints.filter((p) => p._id !== startPoint._id));
      setExclusionDialogOpen(false);
    } else {
      toast.error('Erro ao excluir ponto de partida. Tente novamente mais tarde!');
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography>
        Error fetching start points: {(error as Error).message}
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
      <Typography variant="h2">Pontos de Partida</Typography>
      <Box sx={{ width: '100%', maxWidth: 800, marginBottom: 2 }}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </Box>

      <StartpointTable
        startPoints={filteredStartPoints}
        anchorEl={anchorEl}
        onMenuClick={handleMenuOpen}
        onMenuClose={handleMenuClose}
        onStartPointAction={handleStartPointAction}
      />

      <ButtonRed onClick={() => setCreateDialogOpen(true)}>
        Novo Ponto de Partida
      </ButtonRed>

      <Popup
        openPopup={createDialogOpen}
        setPopup={setCreateDialogOpen}
        title="Criar Novo Ponto de Partida"
      >
        <CreateStartPointForm
          addStartPoint={addStartPoint}
          setDialog={setCreateDialogOpen}
        />
      </Popup>

      <Popup
        openPopup={editionDialogOpen}
        setPopup={setEditionDialogOpen}
        title="Editar Ponto de Partida"
      >
        <UpdateStartPointForm
          updateStartPoint={updateStartPoint}
          startPoint={selectedStartPoint!}
          setDialog={setEditionDialogOpen}
        />
      </Popup>

      <Dialog
        open={exclusionDialogOpen}
        onClose={() => setExclusionDialogOpen(false)}
      >
        <DialogTitle>Confirmar Exclusão de Ponto de Partida</DialogTitle>
        <DialogContent>
          {selectedStartPoint && (
            <Typography variant="h6">{`Excluir ${selectedStartPoint.name}?`}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExclusionDialogOpen(false)} color="error">
            Cancelar
          </Button>
          <Button
            onClick={() => handleRemoveStartPoint(selectedStartPoint!)}
            color="primary"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
export default StartPointPage;