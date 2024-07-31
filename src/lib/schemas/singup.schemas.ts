import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  name: z.string().min(1, { message: 'Name is required' }),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});
export type SignupData = z.infer<typeof signupSchema>;
