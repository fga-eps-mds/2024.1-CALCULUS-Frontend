import { z, ZodSchema } from 'zod';

export const startPointSchema: ZodSchema = z.object({
  name: z.string().min(1, 'Nome do Ponto de Partida é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
});

export type StartPointSchemaData = z.infer<typeof startPointSchema>;
