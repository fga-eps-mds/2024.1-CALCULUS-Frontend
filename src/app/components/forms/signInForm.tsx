'use client';

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SigninData, signinSchema } from '@/lib/schemas/singin.schemas';
import { SignInResponse } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { signIn } from '@/auth';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export function SingInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SigninData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit: SubmitHandler<SigninData> = async (data) => {
    alert(JSON.stringify(data, null, 2));
    // const res = await signIn('credentials', {
    //   email: data.email,
    //   password: data.password,
    //   redirect: true,
    //   redirectTo: '/',
    // });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 justify-center m-3"
    >
      <TextField
        type="email"
        placeholder="Email"
        label="Email"
        required
        sx={{ width: '380px' }}
        margin="dense"
        className="justify-self-center"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        required
        label="Password"
        sx={{ width: '380px' }}
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        margin="dense"
        className="justify-self-center"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <p className="text-[18px] font-light">
        Esqueceu sua senha?<Link href="#" className="text-indigo-700 block">Recuperar senha
        </Link>
      </p>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{ bgcolor: '#000', mt: 2 }}
        type="submit"
      >
        Login
      </Button>
    </Box>
  );
}
