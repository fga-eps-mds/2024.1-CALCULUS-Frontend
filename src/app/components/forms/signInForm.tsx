'use client';

import { Box, Button, TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SigninData, signinSchema } from '@/lib/schemas/singin.schemas';
import { SignInResponse } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { signIn } from '@/auth';

export function SingInForm() {
  const router = useRouter;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SigninData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit: SubmitHandler<SigninData> = async (data) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: true,
      redirectTo: '/',
    });

    console.log('Response: ', res);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        variant="outlined"
        label="Email"
        margin="normal"
        sx={{ bgcolor: 'white' }}
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Password"
        margin="normal"
        type="password"
        sx={{ bgcolor: 'white' }}
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{ bgcolor: '#000', mt: 2 }}
        type="submit"
      >
        Sign up
      </Button>
    </Box>
  );
}
