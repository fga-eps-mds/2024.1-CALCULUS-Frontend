'use client';

import { Box, TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import MyButton from '@/components/ui/buttons/myButton.component';

import {
  startPointSchema,
  StartPointSchemaData,
} from '@/lib/schemas/start-point.schema';
import { updateStartPointById } from '@/services/studioMaker.service';

export function UpdateStartPointForm({
  updateStartPoint,
  startPoint,
  setDialog,
}: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StartPointSchemaData>({
    resolver: zodResolver(startPointSchema),
    defaultValues: {
      name: startPoint.name,
      description: startPoint.description,
    },
  });

  const onSubmit: SubmitHandler<StartPointSchemaData> = async (data) => {
    const response = await updateStartPointById({
      id: startPoint._id,
      data,
      token: JSON.parse(localStorage.getItem('token')!),
    });
    if (response.data) {
      toast.success('Ponto de Partida criado com sucesso!');
      updateStartPoint(response.data);
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
        label="Nome do Ponto de Partida"
        margin="normal"
        required
        sx={{ bgcolor: 'white' }}
        {...register('name')}
        error={!!errors.name}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Breve descrição do ponto de partida"
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
