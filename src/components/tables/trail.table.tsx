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
import { Trail } from '@/lib/interfaces/trails.interface';

interface TrailTableProps {
  trails: Trail[];
  anchorEl: null | HTMLElement;
  onMenuClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    trail: Trail,
  ) => void;
  onMenuClose: () => void;
  onTrailAction: (action: string) => void;
}

const TrailTable: React.FC<TrailTableProps> = ({
  trails,
  anchorEl,
  onMenuClick,
  onMenuClose,
  onTrailAction,
}) => {
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleMenuItemClick = (action: string) => {
    onTrailAction(action);
    onMenuClose();
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trails.map((trail) => (
              <TableRow key={trail._id}>
                <TableCell align="left">{trail.name}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={(e) => onMenuClick(e, trail)}
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
                    <MenuItem
                      onClick={() => router.push(`/studio/${trail._id}`)}
                    >
                      Gerenciar Conteúdos
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

export default TrailTable;
