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
import { StartPoint } from '@/lib/interfaces/startPoint.interface';

interface StartpointTableProps {
  startPoints: StartPoint[];
  anchorEl: null | HTMLElement;
  onMenuClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    startPoint: StartPoint,
  ) => void;
  onMenuClose: () => void;
  onStartpointAction: (action: string) => void;
}

const StartpointTable: React.FC<StartpointTableProps> = ({
  startPoints,
  anchorEl,
  onMenuClick,
  onMenuClose,
  onStartpointAction,
}) => {
  const open = Boolean(anchorEl);
  const router = useRouter();
  const [selectedStartpoint, setSelectedStartpoint] = React.useState<StartPoint | null>(null);

  const handleMenuItemClick = (action: string) => {
    onStartpointAction(action);
    onMenuClose();
  };

  const handleItem = (e: any, startPoint: StartPoint) => {
    onMenuClick(e, startPoint)
    setSelectedStartpoint(startPoint)
  }

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
            {startPoints.map((startPoint) => (
              <TableRow key={startPoint._id}>
                <TableCell align="left">{startPoint.title}</TableCell>
                <TableCell align="left">{startPoint.description}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={(e) => handleItem(e, startPoint)}
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
                      Editar Ponto de partida
                    </MenuItem>
                    <MenuItem
                      onClick={() => router.push(`/journey/${selectedStartpoint?._id}`)}
                    >
                      Gerenciar Jornadas
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

export default StartpointTable;
