'use client'

import '../../../styles/globals.css';
import NavBar from '../../../components/navBar.component';
import Sidebar from '../../../components/sidebar.component';
import SearchBar from '../../../components/searchBar';
import { Box, InputBase, IconButton, List, ListItem, InputAdornment } from '@mui/material';

export default function ManageTrack() {
    return (
        <>
            <NavBar />
            <Sidebar />
            <Box className="flex flex-col items-center mt-8">
                <h1 className="text-black font-bold text-4xl"> Jornada 1</h1>
                <SearchBar />
            </Box>
        </>
    );
}