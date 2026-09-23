import z from "zod";

export const createServiceZodSchema = z.object({
  title: z.string().min(2, {
    message: "Service title must be at least 2 characters long.",
  }),

  description: z.string().min(10, {
    message: "Service description must be at least 10 characters long.",
  }),

  icon: z
    .url({
      message: "Invalid service icon URL.",
    })
    .optional(),

  technologies: z
    .array(
      z.string().min(1, {
        message: "Technology name cannot be empty.",
      }),
    )
    .min(1, {
      message: "At least one technology is required.",
    }),

  features: z
    .array(
      z.string().min(2, {
        message: "Feature must be at least 2 characters long.",
      }),
    )
    .min(1, {
      message: "At least one feature is required.",
    }),

  isFeatured: z.boolean().optional(),

  isActive: z.boolean().optional(),
});

export const updateServiceZodSchema = createServiceZodSchema.partial();
