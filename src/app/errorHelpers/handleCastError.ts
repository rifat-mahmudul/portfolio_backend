import { Error as MongooseError } from "mongoose";

export const handleCastError = (error: MongooseError.CastError) => {
  return {
    statusCode: 400,
    message: `Invalid ${error.path}: ${error.value}`,
    errors: [],
  };
};