import z from "zod";
import { MessageStatus } from "./contact.interface";

export const createContactZodSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long.",
  }),

  email: z.email({
    message: "Invalid email address.",
  }),

  subject: z.string().min(3, {
    message: "Subject must be at least 3 characters long.",
  }),

  message: z.string().min(10, {
    message: "Message must be at least 10 characters long.",
  }),
});

export const updateContactZodSchema = z.object({
  status: z.enum(
    Object.values(MessageStatus) as [MessageStatus, ...MessageStatus[]],
  ),
});
