export const handleDuplicateError = (error: any) => {
  const field = Object.keys(error.keyPattern || {})[0];
  const value = error.keyValue?.[field];

  return {
    statusCode: 409,
    message: `${field} '${value}' already exists.`,
    errors: [],
  };
};