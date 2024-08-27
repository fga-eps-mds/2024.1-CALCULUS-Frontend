import React, { useMemo, useState, useEffect } from 'react';
import {
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_TableContainer,
} from 'material-react-table';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Box,
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
import Popup from './ui/popup';
import { UpdateTrailForm } from './forms/trails/editTrails.form';
import { CreateTrailForm } from './forms/trails/createTrails.form';
import { deleteTrail } from '@/services/studioMaker.service';
import { toast } from 'sonner';
import { studioMakerApi } from '@/services/apis.service';

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
  const [exclusionDialogOpen, setExclusionDialogOpen] = useState<boolean>(false);
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
    if (action === 'excluir') setExclusionDialogOpen(true);
    if (action === 'gerenciar') {
    }
  };

  const addTrail = (trail: Trail) => {
    setListTrails([...listTrails, trail]);
  };

  const updateTrail = (trail: Trail) => {
    setListTrails(listTrails.map((t) => (t._id === trail._id ? trail : t)));
  };

  const handleRemoveTrail = async (trail: Trail) => {
    const response = await deleteTrail({
      id: trail._id,
      token: JSON.parse(localStorage.getItem('token')!),
    });
    if (response.data) {
      toast.success('Trilha excluída com sucesso!');
      setListTrails(listTrails.filter((t) => t._id !== trail._id));
      setExclusionDialogOpen(false);
    } else {
      toast.error('Erro ao excluir Trilha. Tente novamente mais tarde!');
    }
  };

  const columns = useMemo<MRT_ColumnDef<Trail>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nome',
      },
      {
        accessorKey: 'description',
        header: 'Descrição',
      },
      {
        accessorKey: 'actions',
        header: '',
        enableColumnFilter: false,
        Cell: ({ row }: { row: { original: Trail } }) => (
          <>
            <IconButton
              onClick={(e) => {
                handleMenuOpen(e, row.original);
                setSelectedTrail(row.original);
              }}
              color="primary"
            >
              
              <MoreVertIcon />
            </IconButton>
              {row.original.order}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleTrailAction('editar')}>
                Editar Trilha
              </MenuItem>
              <MenuItem onClick={() => handleTrailAction('gerenciar')}>
                Gerenciar Trilha
              </MenuItem>
              <MenuItem onClick={() => handleTrailAction('excluir')}>
                Excluir
              </MenuItem>
            </Menu>
          </>
        ),
      },
    ],
    [anchorEl, handleMenuOpen, handleMenuClose, handleTrailAction]
  );

  const table = useMaterialReactTable({
    columns,
    data: filteredTrails,
    enableRowOrdering: true,
    muiRowDragHandleProps: ({ table }) => ({
      onDragEnd: async () => {
        const { draggingRow, hoveredRow } = table.getState();
        if (hoveredRow && draggingRow) {
          const newData = [...filteredTrails];
          newData.splice(
            (hoveredRow as MRT_Row<Trail>).index,
            0,
            newData.splice(draggingRow.index, 1)[0],
          );
          setFilteredTrails(newData);
          await updateTrailOrder(newData);
        }
      },
    }),
  });

  const updateTrailOrder = async (updatedTrails: Trail[]) => {
    for (var i =0; i<updatedTrails.length;i++){
      updatedTrails[i].order = i;
    }
    try {
      alert(JSON.stringify(updatedTrails))
      const response = await studioMakerApi.put('/trails/update-trail-order', {
        trails: updatedTrails
      })
  
      console.log('Order updated successfully');
    } catch (error) {
      console.error('Error updating trail order:', error);
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

      <MRT_TableContainer table={table} />
      
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
