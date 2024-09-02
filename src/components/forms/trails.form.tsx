'use client';

import { Box, Button, TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { TrailSchemaData, trailsSchema } from '@/lib/schemas/trail.schema';
import { createTrail, updateTrailById } from '@/services/studioMaker.service';

export function TrailForm({ callback, trail, setDialog, journeyId }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TrailSchemaData>({
    resolver: zodResolver(trailsSchema),
    defaultValues: {
      name: trail ? trail.name : '',
    },
  });

  const onSubmit: SubmitHandler<TrailSchemaData> = async (data) => {
    const response = trail
      ? await updateTrailById({
          id: trail._id,
          data,
          token: JSON.parse(localStorage.getItem('token')!),
        })
      : await createTrail({
          data: {
            journeyId: journeyId,
            ...data,
          },
          token: JSON.parse(localStorage.getItem('token')!),
        });
    if (response.data) {
      toast.success('Trail com sucesso!');
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
      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{ bgcolor: '#000', mt: 2 }}
        type="submit"
      >
        {trail ? 'Atualizar' : 'Criar'}
      </Button>
    </Box>
  );
}
