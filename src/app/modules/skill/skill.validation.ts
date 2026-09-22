import z from "zod";

export const createSkillZodSchema = z.object({
  name: z.string().min(2, {
    message: "Skill name must be at least 2 characters long.",
  }),

  category: z.string().min(2, {
    message: "Skill category must be at least 2 characters long.",
  }),

  icon: z
    .url({
      message: "Invalid skill icon URL.",
    })
    .optional(),

  proficiency: z
    .number()
    .min(0, {
      message: "Proficiency cannot be less than 0.",
    })
    .max(100, {
      message: "Proficiency cannot be greater than 100.",
    })
    .optional(),

  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters long.",
    })
    .optional(),
});

export const updateSkillZodSchema = createSkillZodSchema.partial();
