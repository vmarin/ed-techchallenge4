import { z } from 'zod';
import { USER_ROLES } from '../constants/user.roles';

export const createUserSchema = z.object({
  username: z.string(),
  fullName: z.string(),
  password: z.string(),
  isAdmin: z.boolean(),
  role: z.enum(USER_ROLES),
});

export const updateUserSchema = z.object({
  fullName: z.string().optional(),
  isAdmin: z.boolean().optional(),
  role: z.enum(USER_ROLES),
});

export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
