import React, { useMemo, useState, useEffect } from 'react';
import {
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_TableContainer,
  MRT_Row,
} from 'material-react-table';
import { useRouter } from 'next/navigation';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { Journey } from '@/lib/interfaces/journey.interface';

interface JourneyTableProps {
  journeys: Journey[];
  anchorEl: null | HTMLElement;
  onMenuClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    journey: Journey,
  ) => void;
  onMenuClose: () => void;
  onJourneyAction: (action: string) => void;
}

const JourneyTable: React.FC<JourneyTableProps> = ({
  journeys,
  anchorEl,
  onMenuClick,
  onMenuClose,
  onJourneyAction,
}) => {
  const router = useRouter();
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);
  const [data, setData] = useState<Journey[]>(journeys);

  useEffect(() => {
    setData(journeys);
  }, [journeys]);

  const columns = useMemo<MRT_ColumnDef<Journey>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Nome',
      },

      {
        accessorKey: 'actions',
        header: '',
        enableColumnFilter: false,
        Cell: ({ row }: { row: { original: Journey } }) => (
          <>
            <IconButton
              onClick={(e) => {
                onMenuClick(e, row.original);
                setSelectedJourney(row.original);
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
              <MenuItem onClick={() => onJourneyAction('editar')}>
                Editar Jornada
              </MenuItem>
              <MenuItem
                onClick={() => {
                  if (selectedJourney) {
                    router.push(`/trail/${selectedJourney._id}`);
                  }
                }}
              >
                Gerenciar trilhas
              </MenuItem>
              <MenuItem onClick={() => onJourneyAction('excluir')}>
                Excluir
              </MenuItem>
            </Menu>
          </>
        ),
      },
    ],
    [anchorEl, onJourneyAction, onMenuClick, onMenuClose, router, selectedJourney]
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowOrdering: true,
    muiRowDragHandleProps: ({ table }) => ({
      onDragEnd: async () => {
        const { draggingRow, hoveredRow } = table.getState();
        if (hoveredRow && draggingRow) {
          const newData = [...data];
          newData.splice(
            (hoveredRow as MRT_Row<Journey>).index,
            0,
            newData.splice(draggingRow.index, 1)[0],
          );
          setData(newData);
          await updateJourneyOrder(newData);
        }
      },
    }),
  });

  const updateJourneyOrder = async (updatedJourneys: Journey[]) => {
    try {
      const response = await fetch('/api/journeys/update-journey-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ journeys: updatedJourneys }), 
      });
  
      if (!response.ok) {
        throw new Error('Failed to update journey order');
      }
  
      console.log('Order updated successfully');
    } catch (error) {
      console.error('Error updating journey order:', error);
    }
  };

  return <MRT_TableContainer table={table} />;
};

export default JourneyTable;
