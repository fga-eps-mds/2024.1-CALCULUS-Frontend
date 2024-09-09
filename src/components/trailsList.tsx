import React, { useMemo, useState, useEffect } from 'react';
import {
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_TableContainer as MrtTableContainer,
  MRT_Row,
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
import { TrailForm } from './forms/trails.form';
import { deleteTrail, updateTrailsOrder } from '@/services/studioMaker.service';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function TrailsListPage({
  trails,
  journeyId,
}: {
  readonly trails: Trail[];
  readonly journeyId: string;
}) {
  const router = useRouter();
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
    if (action === 'excluir') setExclusionDialogOpen(true);
    if (action === 'gerenciar') {
      router.push(`/studio/${selectedTrail!._id}`);
    }
  };

  const addTrail = (trail: Trail) => {
    setListTrails([...listTrails, trail].sort((a, b) => a.order - b.order));
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
    [anchorEl, handleMenuOpen, handleMenuClose, handleTrailAction],
  );

  const table = useMaterialReactTable({
    columns,
    data: filteredTrails,
    enableRowOrdering: true,
    muiRowDragHandleProps: ({ table }) => ({
      onDragEnd: async (): Promise<void> => {
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
    updatedTrails.forEach((trail, index) => {
      trail.order = index;
    });

    const response = await updateTrailsOrder(updatedTrails);

    if (response.error) {
      toast.error('Error ao atualizar order da trilha');
      return;
    }
    toast.success('Order da trilha atualizada com sucesso');
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

      <MrtTableContainer table={table} />

      <ButtonRed onClick={() => setCreateDialogOpen(true)}>
        Nova Trilha
      </ButtonRed>

      <Popup
        openPopup={editionDialogOpen}
        setPopup={setEditionDialogOpen}
        title="Editar Trilha"
      >
        <TrailForm
          callback={updateTrail}
          trail={selectedTrail!}
          setDialog={setEditionDialogOpen}
        />
      </Popup>

      <Popup
        openPopup={createDialogOpen}
        setPopup={setCreateDialogOpen}
        title="Criar Nova Trilha"
      >
        <TrailForm
          callback={addTrail}
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
