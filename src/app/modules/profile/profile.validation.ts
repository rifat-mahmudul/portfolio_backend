import z from "zod";

export const createProfileZodSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long.",
  }),
  headline: z.string().min(3, {
    message: "Headline must be at least 3 characters long.",
  }),
  bio: z.string().min(10, {
    message: "Bio must be at least 10 characters long.",
  }),
  profileImage: z.url().optional(),
  email: z.email(),
  phone: z.string().optional(),
  location: z.string().optional(),
  github: z.url().optional(),
  linkedin: z.url().optional(),
  twitter: z.url().optional(),
  portfolio: z.url().optional(),
  resumeUrl: z.url().optional(),
});

export const updateProfileZodSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long.",
  }).optional(),
  headline: z.string().min(3, {
    message: "Headline must be at least 3 characters long.",
  }).optional(),
  bio: z.string().min(10, {
    message: "Bio must be at least 10 characters long.",
  }).optional(),
  profileImage: z.url().optional(),
  email: z.email().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  github: z.url().optional(),
  linkedin: z.url().optional(),
  twitter: z.url().optional(),
  portfolio: z.url().optional(),
  resumeUrl: z.url().optional(),
});