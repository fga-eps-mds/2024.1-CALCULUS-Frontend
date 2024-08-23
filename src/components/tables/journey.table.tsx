import React, { useMemo, useState, useEffect } from 'react';
import {
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_TableContainer,
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
        accessorKey: 'description',
        header: 'Descrição',
      },
      {
        accessorKey: 'actions',
        header: '',
        enableColumnFilter: false,
        Cell: ({ row }: any) => (
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
                    router.push(`/journey/${selectedJourney._id}`);
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
      onDragEnd: () => {
        const { draggingRow, hoveredRow } = table.getState();
        if (hoveredRow && draggingRow) {
          const newData = [...data];
          newData.splice(
            (hoveredRow as MRT_Row<Journey>).index,
            0,
            newData.splice(draggingRow.index, 1)[0],
          );
          setData(newData);
        }
      },
    }),
  });

  return <MRT_TableContainer table={table} />;
};

export default JourneyTable;
