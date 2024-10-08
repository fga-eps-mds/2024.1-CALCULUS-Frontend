'use client';

import { Box, IconButton, InputAdornment, Link } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SigninData, signinSchema } from '@/lib/schemas/singin.schemas';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'sonner';
import Mybutton from '@/components/ui/buttons/myButton.component';
import MyInput from '@/components/ui/inputs/myInput.component';

export function SingInForm() {
  const { data: session } = useSession();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (session) {
      localStorage.setItem('token', JSON.stringify(session?.user.accessToken));
      localStorage.setItem(
        'refresh',
        JSON.stringify(session?.user.refreshToken),
      );
      toast.success('Login realizado com sucesso!');
      router.push('/home');
    }
  }, [session]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const {
    register,
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
      <MyInput
        label="Email"
        width="380px"
        required
        register={register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <MyInput
        type={showPassword ? 'text' : 'password'}
        label="Password"
        width="380px"
        required
        register={register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
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
        <Link href="/forgot-password" className="text-indigo-700 block">
          Recuperar senha
        </Link>
      </p>
      <Mybutton type="submit" width="400px" height="61px" color="black" bold>
        Login
      </Mybutton>
    </Box>
  );
}
