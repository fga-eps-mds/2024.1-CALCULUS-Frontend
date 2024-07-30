'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import NavBar from './navBar.component';
import Sidebar from './sidebar.component';
import { Box, Toolbar } from '@mui/material';
import { useSession } from 'next-auth/react';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleDrawerOpen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDrawerClose = () => {
    setSidebarOpen(false);
  };

  return (
    <Box component="main">
        {session.data && <NavBar handleDrawerOpen={handleDrawerOpen} open={sidebarOpen} />}
        {session.data && <Sidebar open={sidebarOpen} handleDrawerOpen={handleDrawerClose} />}
        {children}
      </Box>
  );
}
