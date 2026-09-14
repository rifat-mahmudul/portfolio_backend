import z from "zod";
import { IsActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: "User name must be at least 2 character." }),
  email: z.email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    }),
});

export const updateUserZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: "User name must be at least 2 character." })
    .optional(),
  email: z.email({ message: "Invalid email address format." }).optional(),
  role: z.enum(Object.values(Role)).optional(),
  isActive: z.enum(Object.values(IsActive)).optional(),
  isVerified: z.boolean().optional(),
});
