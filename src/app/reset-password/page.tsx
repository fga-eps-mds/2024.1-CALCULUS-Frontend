'use client';

import Image from 'next/image';
import {
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import calculusLogos from '@/public/calculus-logo.svg';
import { useSearchParams } from 'next/navigation';
import {
  ResetPasswordData,
  resetPasswordSchema,
} from '@/lib/schemas/password.schema';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { resetPassword } from '@/services/user.service';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useState, Suspense } from 'react';

export default function ResetPassword() {
  const SearchParamsComponent = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    return { token };
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsComponentWrapper />
    </Suspense>
  );
}

function SearchParamsComponentWrapper() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => await resetPassword(data),
    onSuccess: (data) => {
      toast.success('Senha alterada com sucesso');
      router.push('/login');
    },
    onError: (error) => {
      toast.error('Ocorreu um erro tente novamente');
    },
  });
  const onSubmit: SubmitHandler<ResetPasswordData> = (data) => {
    mutate({ resetToken: token, newPassword: data.password });
  };

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#F8F3F3] text-black">
      <Image
        className="mx-auto mb-12"
        src={calculusLogos}
        alt="Logo"
        width={128}
        height={128}
      />
      <h2 className="text-4xl font-bold mb-8 text-center">Redefinir Senha</h2>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full max-w-md"
      >
        <TextField
          type={showPassword ? 'text' : 'password'}
          label="Nova senha"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          variant="outlined"
          fullWidth
          className="mb-4"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          type={showConfirmPassword ? 'text' : 'password'}
          label="Confirmar nova senha"
          variant="outlined"
          fullWidth
          className="mb-4"
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          className="bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors w-full"
        >
          Enviar
        </Button>
      </Box>
    </Box>
  );
}
