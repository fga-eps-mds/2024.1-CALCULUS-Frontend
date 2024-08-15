import React, { useState, MouseEvent } from 'react';
import {
  Box,
  InputBase,
  List,
  ListItem,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function SearchBarWithTracks() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const tracks = ['Trilha 1', 'Trilha 2', 'Trilha 3', 'Trilha 4', 'Trilha 5'];

  const handleSearch = () => {
    const filteredResults = tracks.filter((trilha) =>
      trilha.toLowerCase().includes(query.toLowerCase()),
    );
    setResults(filteredResults);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>, item: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddTrack = () => {
    // add new track
    console.log('Adicionar nova trilha');
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 600,
        mx: 'auto',
        mt: 4,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#FFF',
          borderRadius: '20px',
          border: '1px solid #000',
          padding: '2px 10px',
          mb: 2,
        }}
      >
        <SearchIcon sx={{ color: 'gray', mr: 1 }} />
        <InputBase
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por trilhas"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          sx={{
            borderRadius: '20px',
            padding: '8px',
            border: 'none',
          }}
        />
      </Box>
      <Box
        sx={{
          bgcolor: '#FFF',
          borderRadius: '8px',
          border: '1px solid #808080',
          boxShadow: 2,
          color: '#000',
          padding: '16px',
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 'bold', color: '#000' }}
        >
          Nome
        </Typography>
        <List sx={{ p: 0 }}>
          {(results.length > 0 ? results : tracks).map((result, index) => (
            <ListItem
              key={index}
              sx={{
                border: '1px solid #808080', 
                borderRadius: '8px', 
                mb: 2,
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                '&:last-child': {
                  borderBottom: 'none', 
                },
              }}
            >
              {result}
              <IconButton
                edge="end"
                sx={{ ml: 'auto' }}
                onClick={(e) => handleClick(e, result)}
              >
                <MoreVertIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{ mt: '40px', color: '#F3EDF7' }}
      >
        <MenuItem onClick={handleClose}>Editar Trilha</MenuItem>
        <MenuItem onClick={handleClose}>Gerenciar Conteúdos</MenuItem>
        <MenuItem onClick={handleClose} sx={{color: 'red'}}>Excluir</MenuItem>
      </Menu>
      <Button
        onClick={handleAddTrack}
        variant="contained"
        sx={{
          fontWeight: 'bold',
          position: 'fixed',
          bottom: 16,
          right: 44,
          bgcolor: 'red',
          color: 'white',
          py: 2,
          px: 4,
          borderRadius: '50px',
          textTransform: 'none',
          width: 'auto',
          minWidth: '200px',
          maxWidth: '300px',
          transition: 'background-color 0.3s',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          '&:hover': {
            bgcolor: 'darkred',
          },
        }}
      >
        Nova trilha
      </Button>
    </Box>
  );
}
