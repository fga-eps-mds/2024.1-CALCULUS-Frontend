"use client";

import { useState } from 'react';
import MyAppBar from './AppBar';
import Sidebar from './Sidebar';
import { Box, Toolbar } from '@mui/material';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleDrawerOpen = () => {
    setSidebarOpen(true);
  };

  const handleDrawerClose = () => {
    setSidebarOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <MyAppBar handleDrawerOpen={handleDrawerOpen} />
      <Sidebar open={sidebarOpen} handleDrawerClose={handleDrawerClose} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
