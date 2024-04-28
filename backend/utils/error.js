export const errorHandler = (statusCode, message) => {
  const error = {
    statusCode,
    message,
  };
  return error;
};
