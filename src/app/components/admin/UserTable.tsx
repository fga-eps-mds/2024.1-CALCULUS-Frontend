import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

type User = {
  _id: string;
  username: string;
  email: string;
  role: string;
};

interface UserTableProps {
  users: User[];
  anchorEl: null | HTMLElement;
  onMenuClick: (event: React.MouseEvent<HTMLButtonElement>, user: User) => void;
  onMenuClose: () => void;
  onRoleSelect: (role: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, anchorEl, onMenuClick, onMenuClose, onRoleSelect }) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 800 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', textTransform: 'lowercase' }}>username</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textTransform: 'lowercase' }}>email</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textTransform: 'lowercase' }}>role</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={(e) => onMenuClick(e, user)}
                    color="primary"
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onMenuClose}
      >
        <MenuItem onClick={() => onRoleSelect('admin')}>
          <Typography>Tornar Admin</Typography>
        </MenuItem>
        <MenuItem onClick={() => onRoleSelect('aluno')}>
          <Typography>Tornar Aluno</Typography>
        </MenuItem>
        <MenuItem onClick={() => onRoleSelect('professor')}>
          <Typography>Tornar Professor</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserTable;
