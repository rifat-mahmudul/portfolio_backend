import z from "zod";

const projectSectionZodSchema = z.object({
  title: z.string().min(2, {
    message: "Section title must be at least 2 characters long.",
  }),

  content: z.string().min(10, {
    message: "Section content must be at least 10 characters long.",
  }),
});

export const createProjectZodSchema = z.object({
  title: z.string().min(2, {
    message: "Project title must be at least 2 characters long.",
  }),

  shortDescription: z.string().min(10, {
    message: "Short description must be at least 10 characters long.",
  }),

  sections: z.array(projectSectionZodSchema).min(1, {
    message: "Project must have at least one section.",
  }),

  thumbnail: z
    .url({
      message: "Invalid thumbnail URL.",
    })
    .optional(),

  images: z
    .array(
      z.url({
        message: "Invalid image URL.",
      }),
    )
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

  category: z.string().optional(),

  liveUrl: z
    .url({
      message: "Invalid live URL.",
    })
    .optional(),

  githubUrl: z
    .object({
      frontend: z
        .url({
          message: "Invalid frontend GitHub URL.",
        })
        .optional(),

      backend: z
        .url({
          message: "Invalid backend GitHub URL.",
        })
        .optional(),
    })
    .optional(),

  featured: z.boolean().optional(),
});

export const updateProjectZodSchema = createProjectZodSchema.partial();
