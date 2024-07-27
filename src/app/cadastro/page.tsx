import React from 'react';
import { Box, Button, TextField, Typography, IconButton, Link } from '@mui/material';
import { Apple } from '@mui/icons-material'; 
import Image from 'next/image';
import maoCerebro from '../../public/mao_cerebro.png';
import googleIcon from '../../public/googleIcon.svg';
import microsoftIcon from '../../public/microsoftIcon.svg';

const Cadastro = () => {
  return (
    <Box 
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      padding={2}
      bgcolor="#fffafa"
    >
      <Box 
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        maxWidth="800px"
        padding={2}
      >
        <Box display="flex" justifyContent="center" alignItems="center" flex={1} sx={{ marginRight: 15 }}>
          <Image 
            src={maoCerebro}
            alt="Imagem Sign Up"
            width={500}
            height={500}
          />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" flex={1}>
          <Typography variant="h5" gutterBottom align="center">
            Cadastre-se gratuitamente e descubra sua jornada de aprendizado.
          </Typography>
          <Box display="flex" gap={1} mb={2}>
            <IconButton size="large" color="inherit">
            <Image 
                src={googleIcon}
                alt="Google Icon"
                width={20}
                height={20}
              />
            </IconButton>
            <IconButton size="large" color="inherit">
            <Image 
                src={microsoftIcon}
                alt="Microsoft Icon"
                width={20}
                height={20}
              />
            </IconButton>
            <IconButton size="large" color="inherit">
              <Apple />
            </IconButton>
          </Box>
          <TextField 
            fullWidth 
            variant="outlined" 
            label="Email" 
            margin="normal" 
            sx={{ bgcolor: 'white' }}
          />
          <Box display="flex" gap={2} width="100%">
            <TextField 
              fullWidth 
              variant="outlined" 
              label="Name" 
              margin="normal" 
              sx={{ bgcolor: 'white' }}
            />
            <TextField 
              fullWidth 
              variant="outlined" 
              label="Username" 
              margin="normal" 
              sx={{ bgcolor: 'white' }}
            />
          </Box>
          <TextField 
            fullWidth 
            variant="outlined" 
            label="Password" 
            margin="normal" 
            type="password" 
            sx={{ bgcolor: 'white' }}
          />
          <Button 
            fullWidth 
            variant="contained" 
            color="primary" 
            sx={{ bgcolor: '#000', mt: 2 }}
          >
            Sign up
          </Button>
          <Link href="/login" underline="hover" color="inherit" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Já possui cadastro? Log in
            </Typography>
          </Link>  
        </Box>
      </Box>
    </Box>
  );
};

export default Cadastro;