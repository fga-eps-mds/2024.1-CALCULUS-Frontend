import React from 'react';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <IconButton>
            <SearchIcon />
          </IconButton>
        ),
      }}
      sx={{
        backgroundColor: 'white',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#dcdcdc',
            borderRadius: '50px',
          },
          '&:hover fieldset': {
            borderColor: '#a0a0a0',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#a0a0a0',
          },
        },
      }}
    />
  );
};

export default SearchBar;
