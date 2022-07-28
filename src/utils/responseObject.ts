/**
 *
 * @param message
 * @param data
 * @param success
 * @returns {
 * {message, data, success}
 *
 */
export const responseObject = (
  message: string,
  data: Record<any, any>,
  success: boolean,
) => {
  return {
    message,
    data,
    success,
  };
};
