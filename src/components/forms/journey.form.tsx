'use client';

import { Box, Button, TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import MyButton from '@/components/ui/buttons/myButton.component';

import { journeySchema, JourneySchemaData } from '@/lib/schemas/journey.schema';
import {
  createJourney,
  updateJourneyById,
} from '@/services/studioMaker.service';

export function JourneyForm({ callback, journey, setDialog, pointId }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JourneySchemaData>({
    resolver: zodResolver(journeySchema),
    defaultValues: {
      title: journey ? journey.title : '',
    },
  });

  const onSubmit: SubmitHandler<JourneySchemaData> = async (data) => {
    const response = journey
      ? await updateJourneyById({
          id: journey._id,
          data,
          token: JSON.parse(localStorage.getItem('token')!),
        })
      : await createJourney({
          data: { pointId, ...data },
          token: JSON.parse(localStorage.getItem('token')!),
        });
    if (response.data) {
      toast.success('Jornada com sucesso!');
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
        label="Título da Jornada"
        margin="normal"
        required
        sx={{ bgcolor: 'white' }}
        {...register('title')}
        error={!!errors.title}
      />
      <MyButton type="submit" width="100%" height="50px" color="black" bold>
        {journey ? 'Atualizar Jornada' : 'Criar Jornada'}
      </MyButton>
    </Box>
  );
}
