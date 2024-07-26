"use client";

import React, { useState } from 'react';
import { Box } from '@mui/material';
import SearchBar from '../components/admin/SearchBar';
import UserTable from '../components/admin/UserTable';

type User = {
  id: number;
  username: string;
  email: string;
  role: string;
};

const initialUsers: User[] = [
  { id: 1, username: 'user1', email: 'user1@example.com', role: 'admin' },
  { id: 2, username: 'user2', email: 'user2@example.com', role: 'aluno' },
];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleRoleChange = (user: User, newRole: string) => {
    setUsers(users.map(u => u.id === user.id ? { ...u, role: newRole } : u));
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box className="bg-white min-h-screen flex flex-col items-center p-4">
      <Box sx={{ maxWidth: '800px', width: '100%' }}>
        <Box sx={{ mb: 4 }}>
          <SearchBar value={searchQuery} onChange={handleSearchChange} />
        </Box>
        <UserTable users={filteredUsers} onRoleChange={handleRoleChange} />
      </Box>
    </Box>
  );
}
