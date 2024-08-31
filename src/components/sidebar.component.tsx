'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Drawer, IconButton, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';

interface SideBarProps {
  handleDrawerOpen: () => void;
  open: boolean;
}

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles?: string[];
}

const sidebarItems: SidebarItem[] = [
  {
    label: 'Home',
    href: '/home',
    icon: <HomeIcon className="h-5 w-5 mr-2" />,
  },
  {
    label: 'Painel de Administrador',
    href: '/admin',
    icon: <DashboardIcon className="h-5 w-5 mr-2" />,
    roles: ['admin'],
  },
  {
    label: 'Meus Pontos de Partida',
    href: '/starting-points',
    icon: <FollowTheSignsIcon className="h-5 w-5 mr-2" />,
    roles: ['professor', 'admin'],
  },
];

const Sidebar: React.FC<SideBarProps> = ({ handleDrawerOpen, open }) => {
  const { data: session } = useSession();

  return (
    <Drawer anchor="left" open={open} onClose={handleDrawerOpen}>
      <Box sx={{ width: 250 }}>
        <IconButton onClick={handleDrawerOpen}>
          <CloseIcon />
        </IconButton>
        <ul>
          {sidebarItems
            .filter((item) =>
              session && item.roles
                ? item.roles.includes(session.user.role)
                : true,
            )
            .map((item) => (
              <li
                key={item.href}
                className="mb-2 flex items-center p-2 hover:bg-blue-100 hover:text-purple-600 transition duration-200"
              >
                {item.icon}
                <Link
                  href={item.href}
                  className="block p-2 hover:bg-blue-100 hover:text-purple-600 transition duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
        </ul>
      </Box>
    </Drawer>
  );
};

export default Sidebar;