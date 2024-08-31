'use client';

import { Box, TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import MyButton from '@/components/ui/buttons/myButton.component';

import { createStartPoint } from '@/services/studioMaker.service';
import {
  startPointSchema,
  StartPointSchemaData,
} from '@/lib/schemas/start-point.schema';

export function CreateStartPointForm({ addStartPoint, setDialog }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StartPointSchemaData>({
    resolver: zodResolver(startPointSchema),
  });

  const onSubmit: SubmitHandler<StartPointSchemaData> = async (data) => {
    const response = await createStartPoint({
      data,
      token: JSON.parse(localStorage.getItem('token')!),
    });
    if (response.data) {
      toast.success('Ponto de Partida criado com sucesso!');
      addStartPoint(response.data);
      setDialog(false);
    } else {
      toast.error('Ocorreu um erro tente novamente');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        required
        variant="outlined"
        label="Nome da Ponto de Partida"
        margin="normal"
        sx={{ bgcolor: 'white' }}
        {...register('name')}
        error={!!errors.name}
      />
      <TextField
        fullWidth
        required
        variant="outlined"
        label="Breve descrição do ponto de partida"
        margin="normal"
        multiline
        rows={4}
        sx={{ bgcolor: 'white' }}
        {...register('description')}
        error={!!errors.description}
      />
      <MyButton width="100%" color="black" type="submit">
        Criar
      </MyButton>
    </Box>
  );
}
