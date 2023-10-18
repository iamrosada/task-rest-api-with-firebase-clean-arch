import { object, string, union, number } from 'zod';

export const authSchema = object({
  email: string().email('Invalid email format'),
  password: string(),
});

