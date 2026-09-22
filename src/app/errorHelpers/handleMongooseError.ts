import { Error as MongooseError } from "mongoose";

export const handleMongooseError = (
  error: MongooseError.ValidationError,
) => {
  const errors = Object.values(error.errors).map((error: any) => ({
    field: error.path,
    message: error.message,
  }));

  return {
    statusCode: 400,
    message: "Database validation error",
    errors,
  };
};