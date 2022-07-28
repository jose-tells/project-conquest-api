/**
 *
 * @param item
 * @param id
 * @returns Template message for not found exceptions
 */

export const notFoundTemplate = (item: string, id: string) => {
  return {
    message: `${item} with id ${id} not found`,
    data: {},
    success: false,
  };
};
