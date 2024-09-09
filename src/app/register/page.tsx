import React from 'react';
import { Box, Typography, Link, Grid } from '@mui/material';
import Image from 'next/image';
import maoCerebro from '@/public/mao_cerebro.png';
import { SingUpForm } from '@/components/forms/signUpForm';
import { GoogleAuthButton } from '@/components/ui/buttons/googleAuth.button';
import { MicrosoftAuthButton } from '@/components/ui/buttons/microsoftAuth.button';

export default function SingUpPage() {
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
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flex={1}
          sx={{ marginRight: 15 }}
        >
          <Image
            src={maoCerebro}
            alt="Imagem Sign Up"
            width={500}
            height={500}
          />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" flex={1}>
          <Typography
            variant="h5"
            gutterBottom
            align="center"
            className="color-black"
          >
            Cadastre-se gratuitamente e descubra sua jornada de aprendizado.
          </Typography>
          <Grid
            container
            spacing={1}
            justifyContent="center"
            className="mt-2 mb-2"
          >
            <Grid item>
              <GoogleAuthButton />
            </Grid>
            <Grid item>
              <MicrosoftAuthButton />
            </Grid>
            {/* <Grid item>
          <AppleAuthButton />
        </Grid> */}
          </Grid>
          <SingUpForm />
          <Link href="/login" underline="hover" color="inherit" sx={{ mt: 2 }}>
            <Typography variant="body2">Já possui cadastro? Log in</Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
