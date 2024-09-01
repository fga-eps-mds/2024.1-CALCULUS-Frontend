import React, { useMemo, useState, useEffect } from 'react';
import {
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  MRT_TableContainer,
} from 'material-react-table';
import { Box, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { Content } from '@/lib/interfaces/content.interface';

interface SidebarProps {
  contents: Content[];
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  selectedContentId: string | null;
  handleSelectContent: (id: string) => void;
  handleDelete: (id: string, trailId: string) => void;
  trailId: string;
}

const MarkdownSidebar: React.FC<SidebarProps> = ({
  contents,
  sidebarOpen,
  toggleSidebar,
  selectedContentId,
  handleSelectContent,
  handleDelete,
  trailId,
}) => {
  const [data, setData] = useState<Content[]>(contents);

  useEffect(() => {
    setData(contents);
  }, [contents]);

  const columns = useMemo<MRT_ColumnDef<Content>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Title',
        size: 50,
        Cell: ({ row }: { row: MRT_Row<Content> }) => (
          <Button
            variant="text"
            onClick={(e) => {
              e.stopPropagation(); 
              handleSelectContent(row.original._id);
            }}
            fullWidth
            style={{ textAlign: 'left', justifyContent: 'flex-start' }}
          >
            {row.original.title}
          </Button>
        ),
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        size: 100,
        Cell: ({ row }: { row: MRT_Row<Content> }) => (
          <IconButton
            className="text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row.original._id, trailId);
            }}
          >
            <DeleteIcon />
          </IconButton>
        ),
      },
    ],
    [handleSelectContent, handleDelete, selectedContentId, trailId]
  );

  const table = useMaterialReactTable({
    autoResetPageIndex: false,
    columns,
    data,
    enableRowOrdering: true,
    enableSorting: false,
    muiRowDragHandleProps: ({ table }) => ({
      onDragEnd: () => {
        const { draggingRow, hoveredRow } = table.getState();
        if (hoveredRow && draggingRow) {
          const newData = [...data];
          newData.splice(
            (hoveredRow as MRT_Row<Content>).index,
            0,
            newData.splice(draggingRow.index, 1)[0]
          );
          setData(newData);
        }
      },
    }),
  });

  if (!sidebarOpen) return null;

  return (
    <>
      <Box
        className="fixed inset-0 bg-black opacity-50"
        onClick={toggleSidebar}
        style={{ zIndex: 1200 }}
      />
      <Box
        className="fixed top-[64px] left-0 bg-[#F0F0F0] border-r border-[#D9D9D9] h-[calc(100vh-64px)] w-64 p-4 overflow-y-auto"
        style={{ zIndex: 1300 }}
      >
        <IconButton
          className="absolute top-2 right-2 text-[#6667AB]"
          onClick={toggleSidebar}
        >
          <CloseIcon />
        </IconButton>
        <Box mt={4} />
        <MRT_TableContainer table={table} />
      </Box>
    </>
  );
};

export default MarkdownSidebar;
