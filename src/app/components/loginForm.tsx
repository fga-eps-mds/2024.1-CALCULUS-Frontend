import React from 'react';
import Link from 'next/link';
import { Grid } from '@mui/material';
import { SingInForm } from '@/app/components/forms/signInForm';
import { GoogleAuthButton } from '@/app/components/buttons/googleAuth.button';
import { MicrosoftAuthButton } from '@/app/components/buttons/microsoftAuth.button';
import { AppleAuthButton } from '@/app/components/buttons/appleAuth.button';

const LoginForm: React.FC = () => {
  return (
    <>
      <Grid container spacing={1} justifyContent="center" className="mt-2 mb-2">
        <Grid item>
          <GoogleAuthButton />
        </Grid>
        <Grid item>
          <MicrosoftAuthButton />
        </Grid>
        <Grid item>
          <AppleAuthButton />
        </Grid>
      </Grid>

      <SingInForm />

      <p className="text-[18px] font-light">
        Novo Usuário?
        <Link href="/register" className="text-indigo-700 block">
          Cadastre-se
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
