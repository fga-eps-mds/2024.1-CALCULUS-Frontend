'use client';

import { Box, Button, TextField } from '@mui/material';
import MyButton from '@/components/ui/buttons/myButton.component';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { TrailSchemaData, trailsSchema } from '@/lib/schemas/trail.schema';
import { createTrail, updateTrailById } from '@/services/studioMaker.service';

export function CreateTrailForm({ callback, journeyId, setDialog }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TrailSchemaData>({
    resolver: zodResolver(trailsSchema),
  });

  const onSubmit: SubmitHandler<TrailSchemaData> = async (data) => {
    const response = await createTrail({
      data: {
        journeyId: journeyId,
        ...data,
      },
      token: JSON.parse(localStorage.getItem('token')!),
    });
    if (response.data) {
      toast.success('Trail criada com sucesso!');
      callback(response.data);
      setDialog(false);
    } else {
      toast.error('Ocorreu um erro tente novamente');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        variant="outlined"
        label="Nome da Trilha"
        margin="normal"
        required
        sx={{ bgcolor: 'white' }}
        {...register('name')}
        error={!!errors.name}
      />
      <MyButton type="submit" width="100%" height="50px" color="black" bold>
        Criar
      </MyButton>
    </Box>
  );
}
