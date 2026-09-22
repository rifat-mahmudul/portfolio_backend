import z from "zod";

export const createEducationZodSchema = z
  .object({
    institution: z.string().min(2, {
      message: "Institution name must be at least 2 characters long.",
    }),

    institutionLogo: z
      .url({
        message: "Invalid institution logo URL.",
      })
      .optional(),

    degree: z.string().min(2, {
      message: "Degree must be at least 2 characters long.",
    }),

    fieldOfStudy: z.string().optional(),

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

    description: z
      .string()
      .min(10, {
        message: "Description must be at least 10 characters long.",
      })
      .optional(),

    achievements: z
      .array(
        z.string().min(2, {
          message: "Achievement cannot be empty.",
        }),
      )
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isCurrent && data.endDate) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "End date cannot be provided for current education.",
      });
    }

    if (!data.isCurrent && !data.endDate) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "End date is required when education is not current.",
      });
    }

    if (data.endDate && data.startDate >= data.endDate) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "End date must be after start date.",
      });
    }
  });

export const updateEducationZodSchema = createEducationZodSchema.partial();
