import React from 'react';
import { useSession } from 'next-auth/react';
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
import MoreVertIcon from '@mui/icons-material/MoreVert';


type Journey = {
  /* _id: string;
  name: string;
  description: string;
  owner?: string; */
  name: string;
  description: string;
};

interface JourneyTableProps {
  journeys: Journey[];
  anchorEl: null | HTMLElement;
  onMenuClick: (event: React.MouseEvent<HTMLButtonElement>, journey: Journey) => void;
  onMenuClose: () => void;
  onJourneyAction: (role: string) => void;
}

const JourneyTable: React.FC<JourneyTableProps> = ({
  journeys,
  anchorEl,
  onMenuClick,
  onMenuClose,
  onJourneyAction,
}) => {
  const session= useSession();

  return (
    <Box sx={{ width: '100%', maxWidth: 800 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: 'bold', textTransform: 'lowercase' }}
              >
                Nome
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', textTransform: 'lowercase' }}
              >
                Descrição
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {journeys.map((journey) => (
              <TableRow key={journey.name}>
                <TableCell align='left'>{journey.name}</TableCell>
                <TableCell align='left'>{journey.description}</TableCell>
                <TableCell align='right'>
                  {(session.data?.user.role === 'admin' || session.data?.user.role === 'professor') && (<IconButton
                    onClick={(e) => onMenuClick(e, journey)}
                    color="primary"
                  >
                    <MoreVertIcon />
                  </IconButton>)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onMenuClose}>
        <MenuItem onClick={() => onJourneyAction('editar')}>
          <Typography>Editar Jornada </Typography>
        </MenuItem>
        <MenuItem onClick={() => onJourneyAction('gerenciar')}>
          <Typography>Gerenciar trilhas</Typography>
        </MenuItem>
        <MenuItem onClick={() => onJourneyAction('excluir')}>
          <Typography className='text-[#ED3419]'>Excluir</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default JourneyTable;
