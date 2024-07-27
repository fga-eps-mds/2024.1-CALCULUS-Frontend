"use client";

import Layout from '../components/ClientLayout';
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
    <Box className="flex min-h-screen">
      <Box className="flex-1 p-4" sx={{ maxWidth: '800px', width: '100%', margin: '0 auto' }}>
        <Box sx={{ mb: 4 }}>
          <SearchBar value={searchQuery} onChange={handleSearchChange} />
        </Box>
        <UserTable users={filteredUsers} onRoleChange={handleRoleChange} />
      </Box>
    </Box>
  );
}
