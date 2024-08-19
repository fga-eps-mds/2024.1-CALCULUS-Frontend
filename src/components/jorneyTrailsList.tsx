import React, { useState, MouseEvent, useEffect } from 'react';
import {
  Box,
  InputBase,
  List,
  ListItem,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Trail } from '@/lib/interfaces/trails.interface';
import ButtonRed from './ui/buttons/red.button';
import SearchBar from './admin/SearchBar';
import TrailTable from './tables/trail.table';
import Popup from './ui/popup';
import { UpdateTrailForm } from './forms/trails/editTrails.form';
import { CreateTrailForm } from './forms/trails/createTrails.form';
import { deleteTrail } from '@/services/studioMaker.service';
import { toast } from 'sonner';

export default function JorneyTrailsListPage({
  trails,
  journeyId,
}: {
  trails: Trail[];
  journeyId: string;
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const [listTrails, setListTrails] = useState(trails);
  const [filteredTrails, setFilteredTrails] = useState(trails);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);
  const [exclusionDialogOpen, setExclusionDialogOpen] =
    useState<boolean>(false);
  const [editionDialogOpen, setEditionDialogOpen] = useState<boolean>(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredTrails(listTrails);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = listTrails.filter((trail) =>
        trail.name.toLowerCase().includes(lowercasedQuery),
      );
      setFilteredTrails(filtered);
    }
  }, [searchQuery, listTrails]);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    trail: Trail,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedTrail(trail);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTrailAction = (action: string) => {
    if (action === 'editar') setEditionDialogOpen(true);
    if (action === 'gerenciar') alert("Redirect to selected trail's trails");
    if (action === 'excluir') setExclusionDialogOpen(true);
  };

  const addTrail = (trail: Trail) => {
    setListTrails([...listTrails, trail]);
  };

  const updateTrail = (trail: Trail) => {
    setListTrails(listTrails.map((j) => (j._id === trail._id ? trail : j)));
  };

  const handleRemoveTrail = async (trail: Trail) => {
    const response = await deleteTrail({
      id: trail._id,
      token: JSON.parse(localStorage.getItem('token')!),
    });
    if (response.data) {
      toast.success('Trilha excluída com sucesso!');
      setListTrails(listTrails.filter((j) => j._id !== trail._id));
      setExclusionDialogOpen(false);
    } else {
      toast.error('Erro ao excluir Trilha. Tente novamente mais tarde!');
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 800, marginBottom: 2 }}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </Box>

      <TrailTable
        trails={filteredTrails}
        anchorEl={anchorEl}
        onMenuClick={handleMenuOpen}
        onMenuClose={handleMenuClose}
        onTrailAction={handleTrailAction}
      />

      <ButtonRed onClick={() => setCreateDialogOpen(true)}>
        Nova Trilha
      </ButtonRed>

      <Popup
        openPopup={editionDialogOpen}
        setPopup={setEditionDialogOpen}
        title="Editar Trilha"
      >
        <UpdateTrailForm
          updateTrail={updateTrail}
          trail={selectedTrail!}
          setDialog={setEditionDialogOpen}
        />
      </Popup>

      <Popup
        openPopup={createDialogOpen}
        setPopup={setCreateDialogOpen}
        title="Criar Nova Trilha"
      >
        <CreateTrailForm
          addTrail={addTrail}
          journeyId={journeyId}
          setDialog={setCreateDialogOpen}
        />
      </Popup>

      <Dialog
        open={exclusionDialogOpen}
        onClose={() => setExclusionDialogOpen(false)}
      >
        <DialogTitle>Confirmar Exclusão de Trilha</DialogTitle>
        <DialogContent>
          {selectedTrail && (
            <Typography variant="h6">{`Excluir ${selectedTrail.name}?`}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExclusionDialogOpen(false)} color="error">
            Cancelar
          </Button>
          <Button
            onClick={() => handleRemoveTrail(selectedTrail!)}
            color="primary"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
