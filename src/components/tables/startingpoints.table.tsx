import React, { useMemo } from 'react';
import {
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_TableContainer,
  MRT_Row,
} from 'material-react-table';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { StartPoint } from '@/lib/interfaces/startPoint.interface';
import { updatePointOrder } from '@/services/studioMaker.service';
import { toast } from 'sonner';

interface StartpointTableProps {
  startPoints: StartPoint[];
  anchorEl: null | HTMLElement;
  onMenuClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    startPoint: StartPoint,
  ) => void;
  onMenuClose: () => void;
  onStartPointAction: (action: string) => void;
  onUpdateStartPoints: OnUpdateStartPoints;
}

const StartpointTable: React.FC<StartpointTableProps> = ({
  startPoints,
  anchorEl,
  onMenuClick,
  onMenuClose,
  onStartPointAction,
  onUpdateStartPoints,
}) => {
  const open = Boolean(anchorEl);
  const [selectedStartPoint, setSelectedStartPoint] =
    React.useState<StartPoint | null>(null);

  const handleMenuItemClick = (action: string) => {
    onStartPointAction(action);
    onMenuClose();
  };

  const handleItem = (e: any, startPoint: StartPoint) => {
    onMenuClick(e, startPoint);
    setSelectedStartPoint(startPoint);
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
                setSelectedStartPoint(row.original);
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
                Editar Trilha
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('gerenciar')}>
                Gerenciar Trilha
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('excluir')}>
                Excluir
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
    data: startPoints, // Use diretamente `startPoints` aqui
    enableRowOrdering: true,
    enablePagination: false,
    muiRowDragHandleProps: ({ table }) => ({
      onDragEnd: async () => {
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
    <MRT_TableContainer table={table} />
  );
};

export default StartpointTable;
