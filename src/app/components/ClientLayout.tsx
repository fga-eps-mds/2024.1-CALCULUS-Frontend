import React, { useState } from 'react';
import { useRouter } from 'next/router';
import MyAppBar from './AppBar';
import Sidebar from './Sidebar';
import { Box, Toolbar } from '@mui/material';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { pathname } = router;

  const handleDrawerOpen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDrawerClose = () => {
    setSidebarOpen(false);
  };

  const isAuthPage = pathname === '/login' || pathname === '/signup';

  return (
    <Box sx={{ display: 'flex' }}>
      {!isAuthPage && <MyAppBar handleDrawerOpen={handleDrawerOpen} open={sidebarOpen} />}
      {!isAuthPage && <Sidebar open={sidebarOpen} handleDrawerOpen={handleDrawerClose} />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
