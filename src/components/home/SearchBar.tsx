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
      style={{ width: '400px' }}
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
        borderRadius: '10px',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderWidth: '1px',
            borderColor: '#dcdcdc',
            borderRadius: '10px',
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
