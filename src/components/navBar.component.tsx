import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './sidebar.component';
import { SignOutButton } from './ui/buttons/signOut.button';
import CalculusHeader from './ui/typography/calculustNavbar.typography';

interface NavBarProps {
  handleDrawerOpen: () => void;
  open: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ handleDrawerOpen, open }) => {
  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
            sx={{ color: 'black' }}
          >
            <MenuIcon />
          </IconButton>
          <CalculusHeader />
          <SignOutButton />
        </Toolbar>
      </AppBar>
      <Sidebar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Box sx={{ height: '64px' }} /> {/* Espaço reservado para a AppBar */}
    </>
  );
};

export default NavBar;
