import { z } from "zod";


export const createUserSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().toLowerCase(),
  age: z.coerce.number().min(1).max(120),
  verified: z.boolean().optional().default(false),
  role: z.enum(["admin", "user"]).optional().default("user"),
});



export const updateUserSchema = z.object({
  name: z.string().min(2).max(100).trim().optional(),
  email: z.string().email().toLowerCase().optional(),
  age: z.coerce.number().min(1).max(120).optional(),
  verified: z.boolean().optional(),
  role: z.enum(["admin", "user"]).optional(), // admin can update roles
});

