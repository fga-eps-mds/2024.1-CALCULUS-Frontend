import { z, ZodSchema } from 'zod';

export const journeySchema: ZodSchema = z.object({
  title: z.string().min(1, 'Nome da Jornada é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
});

export type JourneySchemaData = z.infer<typeof journeySchema>;
