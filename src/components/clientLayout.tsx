'use client';

import React, { useState } from 'react';
import NavBar from './navBar.component';
import Sidebar from './sidebar.component';
import { Box } from '@mui/material';
import { useSession } from 'next-auth/react';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleDrawerOpen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDrawerClose = () => {
    setSidebarOpen(false);
  };

  return (
    <Box component="main">
      {session && (
        <NavBar handleDrawerOpen={handleDrawerOpen} open={sidebarOpen} />
      )}
      {session && (
        <Sidebar open={sidebarOpen} handleDrawerOpen={handleDrawerClose} />
      )}
      {children}
    </Box>
  );
}
