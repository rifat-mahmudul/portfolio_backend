import { Error as MongooseError } from "mongoose";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { envVars } from "../config/env";
import { handleZodError } from "../errorHelpers/handleZodError";
import { handleMongooseError } from "../errorHelpers/handleMongooseError";
import { handleCastError } from "../errorHelpers/handleCastError";
import { handleDuplicateError } from "../errorHelpers/handleDuplicateError";
import AppError from "../errorHelpers/appError";
import multer from "multer";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errors: any[] = [];

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof ZodError) {
    const result = handleZodError(err);

    statusCode = result.statusCode;
    message = result.message;
    errors = result.errors;
  } else if (err instanceof MongooseError.ValidationError) {
    const result = handleMongooseError(err);

    statusCode = result.statusCode;
    message = result.message;
    errors = result.errors;
  } else if (err instanceof MongooseError.CastError) {
    const result = handleCastError(err);

    statusCode = result.statusCode;
    message = result.message;
    errors = result.errors;
  } else if (err?.code === 11000) {
    const result = handleDuplicateError(err);

    statusCode = result.statusCode;
    message = result.message;
    errors = result.errors;
  } else if (err instanceof multer.MulterError) {
    statusCode = 400;

    if (err.code === "LIMIT_FILE_SIZE") {
      message = "File size must be less than 5MB.";
    } else {
      message = err.message;
    }
  } else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
