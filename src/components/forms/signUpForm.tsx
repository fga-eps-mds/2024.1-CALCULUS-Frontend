'use client';

import { Box, Button, TextField } from '@mui/material';
import { SignupData, signupSchema } from '@/lib/schemas/singup.schemas';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { createUser } from '@/services/user.service';

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
      <Box display="flex" gap={2} width="100%">
        <TextField
          fullWidth
          variant="outlined"
          label="Name"
          margin="normal"
          sx={{ bgcolor: 'white' }}
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Username"
          margin="normal"
          sx={{ bgcolor: 'white' }}
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
      </Box>
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
        {isPending ? 'Loading...' : 'Sign up'}
      </Button>
    </Box>
  );
}
