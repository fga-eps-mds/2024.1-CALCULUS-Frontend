'use client';

import { Box, Button, TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import MyButton from '@/components/ui/buttons/myButton.component';

import { journeySchema, JourneySchemaData } from '@/lib/schemas/journey.schema';
import { updateJourneyById } from '@/services/studioMaker.service';

export function UpdateJourneyForm({ updateJourney, journey, setDialog }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JourneySchemaData>({
    resolver: zodResolver(journeySchema),
    defaultValues: {
      title: journey.title,
      description: journey.description,
    },
  });

  const onSubmit: SubmitHandler<JourneySchemaData> = async (data) => {
    const response = await updateJourneyById({
      id: journey._id,
      data,
      token: JSON.parse(localStorage.getItem('token')!),
    });
    if (response.data) {
      toast.success('Jornada criada com sucesso!');
      updateJourney(response.data);
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
        label="Nome da Jornada"
        margin="normal"
        required
        sx={{ bgcolor: 'white' }}
        {...register('title')}
        error={!!errors.title}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Breve descrição da jornada"
        margin="normal"
        multiline
        rows={4}
        sx={{ bgcolor: 'white' }}
        {...register('description')}
        error={!!errors.description}
      />
      <MyButton type="submit" width="100%" height="50px" color="black" bold>
        Editar
      </MyButton>
    </Box>
  );
}
