'use client';

import { Box } from '@mui/material';
import { SignupData, signupSchema } from '@/lib/schemas/singup.schemas';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { createUser } from '@/services/user.service';

import Mybutton from '@/components/ui/buttons/myButton.component';
import MyInput from '@/components/ui/inputs/myInput.component';

export function SingUpForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const { mutate: server_createUser, isPending } = useMutation({
    mutationFn: async (data: SignupData) => await createUser(data),
    onSuccess: (data) => {
      toast.success(data.data.message);
      router.push('/login');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<SignupData> = (data) => {
    server_createUser(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <MyInput
        fullWidth
        label="Email"
        bgcolor="white"
        register={register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <Box display="flex" gap={2} width="100%">
        <MyInput
          fullWidth
          label="Name"
          bgcolor="white"
          register={register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <MyInput
          fullWidth
          label="Username"
          bgcolor="white"
          register={register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
      </Box>

      <MyInput
        fullWidth
        label="Password"
        type="password"
        bgcolor="white"
        register={register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Mybutton type="submit" width="400px" height="61px" color="black" bold>
        {isPending ? 'Loading...' : 'Sign up'}
      </Mybutton>
    </Box>
  );
}
