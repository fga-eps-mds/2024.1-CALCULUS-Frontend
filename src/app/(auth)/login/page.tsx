import { Box, Grid, Link } from '@mui/material';
import Image from 'next/image';
import calcuclusLogo from '@/public/calculus-logo.svg';
import { GoogleAuthButton } from '@/components/ui/buttons/googleAuth.button';
import { MicrosoftAuthButton } from '@/components/ui/buttons/microsoftAuth.button';
import { SingInForm } from '@/components/forms/signInForm';

export default function LoginPage() {
  return (
    <Box className="h-screen w-screen flex justify-center items-center bg-[#F8F3F3] box-border gap-0">
      <Box className="flex flex-col text-center box-border gap-3 max-h-[900px] justify-self-center">
        <Box className="flex flex-col justify-around mb-2">
          <Image
            className="self-center"
            src={calcuclusLogo}
            alt="Logo"
            width={96}
            height={96}
          />
          <p className="text-[32px] font-bold">Login</p>
        </Box>
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
        </Grid>

        <SingInForm />

        <p className="text-[18px] font-light">
          Novo Usuário?
          <Link href="/register" className="text-indigo-700 block">
            Cadastre-se
          </Link>
        </p>
      </Box>
    </Box>
  );
}
