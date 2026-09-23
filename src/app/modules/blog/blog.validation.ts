import z from "zod";
import { BlogStatus } from "./blog.interface";

const blogSectionZodSchema = z.object({
  title: z.string().min(2, {
    message: "Section title must be at least 2 characters long.",
  }),

  content: z.string().min(10, {
    message: "Section content must be at least 10 characters long.",
  }),
});

export const createBlogZodSchema = z.object({
  title: z.string().min(5, {
    message: "Blog title must be at least 5 characters long.",
  }),

  excerpt: z.string().min(20, {
    message: "Blog excerpt must be at least 20 characters long.",
  }),

  sections: z.array(blogSectionZodSchema).min(1, {
    message: "Blog must contain at least one section.",
  }),

  thumbnail: z.url({
    message: "Invalid thumbnail URL.",
  }),

  category: z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: "Invalid category id.",
  }),

  tags: z
    .array(
      z.string().min(1, {
        message: "Tag cannot be empty.",
      }),
    )
    .min(1, {
      message: "At least one tag is required.",
    }),

  status: z
    .enum(Object.values(BlogStatus) as [BlogStatus, ...BlogStatus[]])
    .optional(),

  featured: z.boolean().optional(),

  seoTitle: z
    .string()
    .min(5, {
      message: "SEO title must be at least 5 characters long.",
    })
    .optional(),

  seoDescription: z
    .string()
    .min(10, {
      message: "SEO description must be at least 10 characters long.",
    })
    .optional(),

  seoKeywords: z
    .array(
      z.string().min(1, {
        message: "SEO keyword cannot be empty.",
      }),
    )
    .optional(),

  canonicalUrl: z
    .url({
      message: "Invalid canonical URL.",
    })
    .optional(),

  ogImage: z
    .url({
      message: "Invalid OG image URL.",
    })
    .optional(),
});

export const updateBlogZodSchema = createBlogZodSchema.partial();
