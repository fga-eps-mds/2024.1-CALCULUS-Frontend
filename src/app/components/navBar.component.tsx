import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './sidebar.component';
import { SignOutButton } from './buttons/singOut.button';

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
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: 'black', fontWeight: 'bold' }}
          >
            Calculus
          </Typography>
          <SignOutButton />
        </Toolbar>
      </AppBar>
      <Sidebar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Box sx={{ height: '64px' }} /> {/* Espaço reservado para a AppBar */}
    </>
  );
};

export default NavBar;
