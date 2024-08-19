import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleMenuItemClick = (action: string) => {
    onJourneyAction(action);
    onMenuClose();
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Descrição</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {journeys.map((journey) => (
              <TableRow key={journey._id}>
                <TableCell align="left">{journey.title}</TableCell>
                <TableCell align="left">{journey.description}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={(e) => onMenuClick(e, journey)}
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
                      Editar Jornada
                    </MenuItem>
                    <MenuItem
                      onClick={() => router.push(`/journey/${journey._id}`)}
                    >
                      Gerenciar trilhas
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick('excluir')}>
                      Excluir
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default JourneyTable;
