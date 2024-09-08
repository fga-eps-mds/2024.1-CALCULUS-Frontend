import React, { useMemo } from 'react';
import {
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_TableContainer as MrtTableContainer,
  MRT_Row,
} from 'material-react-table';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { StartPoint } from '@/lib/interfaces/startPoint.interface';
import { updatePointOrder } from '@/services/studioMaker.service';
import { toast } from 'sonner';

interface StartPointTableProps {
  startPoints: StartPoint[];
  anchorEl: null | HTMLElement;
  onMenuClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    startPoint: StartPoint,
  ) => void;
  onMenuClose: () => void;
  onStartPointAction: (action: string) => void;
  onUpdateStartPoints: (updatedStartPoints: StartPoint[]) => void;
}

const StartPointTable: React.FC<StartPointTableProps> = ({
  startPoints,
  anchorEl,
  onMenuClick,
  onMenuClose,
  onStartPointAction,
  onUpdateStartPoints,
}) => {
  const handleMenuItemClick = (action: string) => {
    onStartPointAction(action);
    onMenuClose();
  };

  const columns = useMemo<MRT_ColumnDef<StartPoint>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nome',
      },
      {
        accessorKey: 'actions',
        header: '',
        enableColumnFilter: false,
        Cell: ({ row }: { row: { original: StartPoint } }) => (
          <>
            <IconButton
              onClick={(e) => {
                onMenuClick(e, row.original);
              }}
              color="primary"
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={onMenuClose}
            >
              <MenuItem onClick={() => handleMenuItemClick('editar')}>
                Editar Ponto de Partida
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('gerenciar')}>
                Gerenciar Ponto de Partida
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('excluir')}>
                Excluir Ponto de Partida
              </MenuItem>
            </Menu>
          </>
        ),
      },
    ],
    [anchorEl, onMenuClick, onMenuClose, handleMenuItemClick],
  );

  const table = useMaterialReactTable({
    columns,
    data: startPoints,
    enableRowOrdering: true,
    enablePagination: false,
    muiRowDragHandleProps: ({ table }) => ({
      onDragEnd: async (): Promise<void> => {
        const { draggingRow, hoveredRow } = table.getState();
        if (hoveredRow && draggingRow) {
          const newData = [...startPoints];
          newData.splice(
            (hoveredRow as MRT_Row<StartPoint>).index,
            0,
            newData.splice(draggingRow.index, 1)[0],
          );

          await updateTrailOrder(newData);
          onUpdateStartPoints(newData);
        }
      },
    }),
  });

  const updateTrailOrder = async (updatedTrails: StartPoint[]) => {
    updatedTrails.forEach((trail, index) => {
      trail.order = index;
    });

    const response = await updatePointOrder(updatedTrails);

    if (response.error) {
      toast.error('Erro ao atualizar ordem da trilha');
      return;
    }
    toast.success('Ordem da trilha atualizada com sucesso');
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800 }}>
      <MrtTableContainer table={table} />
    </Box>
  );
};

export default StartPointTable;
