import { z } from 'zod';

export const signinSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string(),
});
export type SigninData = z.infer<typeof signinSchema>;
