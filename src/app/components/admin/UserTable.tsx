'use client';

import React, { useState, MouseEvent } from 'react';
import {
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
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

type User = {
  id: number;
  username: string;
  email: string;
  role: string;
};

interface UserTableProps {
  users: User[];
  onRoleChange: (user: User, newRole: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onRoleChange }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<null | User>(null);

  const handleMenuClick = (event: MouseEvent<HTMLElement>, user: User) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleRoleChange = (newRole: string) => {
    if (selectedUser) {
      onRoleChange(selectedUser, newRole);
      handleMenuClose();
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <IconButton onClick={(event) => handleMenuClick(event, user)}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedUser?.id === user.id}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleRoleChange('admin')}>
                    Admin
                  </MenuItem>
                  <MenuItem onClick={() => handleRoleChange('professor')}>
                    Professor
                  </MenuItem>
                  <MenuItem onClick={() => handleRoleChange('aluno')}>
                    Aluno
                  </MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
