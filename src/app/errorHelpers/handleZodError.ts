import { ZodError } from "zod";

export const handleZodError = (error: ZodError) => {
  const errors = error.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));

  return {
    statusCode: 400,
    message: "Validation error",
    errors,
  };
};