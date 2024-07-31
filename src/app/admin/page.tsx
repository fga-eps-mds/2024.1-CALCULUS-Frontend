"use client";

import React, { useState, useEffect } from 'react';
import UserTable from '../components/admin/UserTable';
import SearchBar from '../components/admin/SearchBar';
import { getUsers, updateUserRole } from '@/services/user.service';
import { CircularProgress, Box, Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

type User = {
  _id: string;
  username: string;
  email: string;
  role: string;
};

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response);
        setFilteredUsers(response);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const newFilteredUsers = users.filter(user =>
      user.username.toLowerCase().includes(lowercasedQuery) ||
      user.email.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredUsers(newFilteredUsers);
  }, [searchQuery, users]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, user: User) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
    setSelectedRole(null);
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setDialogOpen(true);
  };

  const confirmRoleChange = async () => {
    if (selectedUser && selectedRole) {
      try {
        await updateUserRole(selectedUser._id, selectedRole);
        const updatedUsers = users.map(user =>
          user._id === selectedUser._id ? { ...user, role: selectedRole } : user
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        handleMenuClose();
      } catch (err) {
        setError('Failed to update user role');
      } finally {
        setDialogOpen(false);
      }
    }
  };

  const cancelRoleChange = () => {
    setDialogOpen(false);
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;

  return (
    <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 800, marginBottom: 2 }}>
        <SearchBar value={searchQuery} onChange={handleSearch} />
      </Box>
      <UserTable
        users={filteredUsers}
        anchorEl={anchorEl}
        onMenuClick={handleMenuClick}
        onMenuClose={handleMenuClose}
        onRoleSelect={handleRoleSelect}
      />

      {/* Dialog de confirmação */}
      <Dialog open={dialogOpen} onClose={cancelRoleChange}>
        <DialogTitle>Confirmar Alteração de Role</DialogTitle>
        <DialogContent>
          {selectedUser && selectedRole && (
            <Typography variant="h6">
              {`Tornar ${selectedUser.username} ${selectedRole}`}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelRoleChange} color="error">
            Cancelar
          </Button>
          <Button onClick={confirmRoleChange} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Admin;
