'use client';

import Image from 'next/image';
import MyButton from '@/components/ui/buttons/myButton.component';
import { Box, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import calcuclusLogo from '@/public/calculus-logo.svg';
import { forgotPassword } from '@/services/user.service';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  ForgotPasswordData,
  forgotPasswordSchema,
} from '@/lib/schemas/password.schema';

export default function ForgotPassword() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { mutate } = useMutation({
    mutationFn: async (data: ForgotPasswordData) => await forgotPassword(data),
    onSuccess: () => {
      toast.success(
        'Email enviado com sucesso! Verifique sua caixa de entrada para obter as instruções.',
      );
      router.push('/');
    },
    onError: () => {
      toast.error(
        'Ocorreu um erro ao enviar o email. Tente novamente mais tarde.',
      );
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordData> = (data) => {
    mutate(data);
  };

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#F8F3F3]">
      <Image
        src={calcuclusLogo}
        alt="Logo"
        width={128}
        height={128}
        className="mx-auto mb-12"
      />
      <h2 className="text-2xl font-bold mb-4 text-center text-black">
        Esqueci a Senha
      </h2>
      <p className="text-justify text-black font-bold">
        Enviaremos as instruções para o seu email.
      </p>
      <p className="mb-4 text-justify text-black font-bold">
        Para que você possa recuperar a sua senha.
      </p>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full max-w-md"
      >
        <TextField
          type="email"
          label="Digite seu email"
          {...register('email')}
          variant="outlined"
          fullWidth
          className="mb-4 w-full text-black"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <MyButton width="400px" height="61px" color="black" bold type="submit">
          Enviar
        </MyButton>
      </Box>
    </Box>
  );
}
