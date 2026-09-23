import z from "zod";

export const createBlogCategoryZodSchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters long.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Category description must be at least 10 characters long.",
    })
    .optional(),
  isActive: z.boolean().optional(),
});

export const updateBlogCategoryZodSchema =
  createBlogCategoryZodSchema.partial();
