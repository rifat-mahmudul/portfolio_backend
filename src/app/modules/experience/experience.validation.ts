import z from "zod";

export const createExperienceZodSchema = z.object({
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters long.",
  }),

  companyLogo: z.url({
    message: "Invalid company logo URL.",
  }),

  position: z.string().min(2, {
    message: "Position must be at least 2 characters long.",
  }),

  location: z.string().optional(),

  startDate: z.coerce.date({
    message: "Invalid start date.",
  }),

  endDate: z.coerce
    .date({
      message: "Invalid end date.",
    })
    .optional(),

  isCurrent: z.boolean(),

  description: z.string().min(10, {
    message: "Description must be at least 10 characters long.",
  }),

  responsibilities: z
    .array(
      z.string().min(2, {
        message: "Responsibility cannot be empty.",
      }),
    )
    .min(1, {
      message: "At least one responsibility is required.",
    }),

  technologies: z
    .array(
      z.string().min(1, {
        message: "Technology name cannot be empty.",
      }),
    )
    .min(1, {
      message: "At least one technology is required.",
    }),
});

export const updateExperienceZodSchema = createExperienceZodSchema.partial();
