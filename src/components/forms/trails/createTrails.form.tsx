'use client';

import { Box, Button, TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { TrailSchemaData, trailsSchema } from '@/lib/schemas/trail.schema';
import { createTrail, updateTrailById } from '@/services/studioMaker.service';

export function CreateTrailForm({ addTrail, journeyId, setDialog }: any) {
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
      addTrail(response.data);
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
      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{ bgcolor: '#000', mt: 2 }}
        type="submit"
      >
        Criar
      </Button>
    </Box>
  );
}
