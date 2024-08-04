'use client';

import { Box, Button, TextField } from '@mui/material';
import { SignupData, signupSchema } from '@/lib/schemas/singup.schemas';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { createUser } from '@/services/user.service';

export function SingUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupData> = async (data) => {
    const response = await createUser(data);
    console.log('Response: ', response);

    if (!response.error) {
      toast.success('Cadastrado com sucesso!');
    } else {
      toast.error(response.error);
    }
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
        Sign up
      </Button>
    </Box>
  );
}
