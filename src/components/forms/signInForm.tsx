'use client';

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SigninData, signinSchema } from '@/lib/schemas/singin.schemas';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'sonner';
import Mybutton from '@/components/ui/buttons/myButton.component';

export function SingInForm() {
  const session = useSession();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (session.data) {
      toast.success('Login realizado com sucesso!');
      router.push('/home');
    }
  }, [session.data]);

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

  return (
    <Box
      component="form"
      action={() => {
        signIn('credentials', {
          email: watch('email'),
          password: watch('password'),
          redirect: false,
        });
      }}
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
        Esqueceu sua senha?
        <Link href="#" className="text-indigo-700 block">
          Recuperar senha
        </Link>
      </p>
      <Mybutton type='submit' width='400px' height='61px' color='black'>
        Login
      </Mybutton>
    </Box>
  );
}
