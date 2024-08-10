'use client';

import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Drawer, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSession } from 'next-auth/react';

interface SideBarProps {
  handleDrawerOpen: () => void;
  open: boolean;
}

const Sidebar: React.FC<SideBarProps> = ({ handleDrawerOpen, open }) => {
  const { data: session } = useSession();

  return (
    <Drawer anchor="left" open={open} onClose={handleDrawerOpen}>
      <Box sx={{ width: 250 }}>
        <IconButton onClick={handleDrawerOpen}>
          <CloseIcon />
        </IconButton>
        <ul>
          <li className="mb-2 flex items-center p-2 hover:bg-blue-100 hover:text-purple-600 transition duration-200">
            <HomeIcon className="h-5 w-5 mr-2" />
            <Link
              href="/home"
              className="block p-2 hover:bg-blue-100 hover:text-purple-600 transition duration-200"
            >
              Home
            </Link>
          </li>
          {session?.user.role === 'admin' && (
            <li className="mb-2 flex items-center p-2 hover:bg-blue-100 hover:text-purple-600 transition duration-200">
              <DashboardIcon className="h-5 w-5 mr-2" />

              <Link
                href="/admin"
                className="block p-2 hover:bg-blue-100 hover:text-purple-600 transition duration-200"
              >
                Painel de Administrador
              </Link>
            </li>
          )}
        </ul>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
