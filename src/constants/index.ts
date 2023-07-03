export const URL_REG_EXP = /\/users\/[0-9a-zA-Z!"#$%&'()*+,-./\\:;<=>?@[\]^_`{|}~]+$/;

export const UUID_REG_EXP = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const ERROR_MESSAGES = {
  pageNotFound: 'Route not found',
  server: 'The server encountered an error and could not complete your request',
  userNotFound: 'User not found',
  invalidId: 'User ID is not valid (not UUID)',
  invalidFields: 'Fields required in valid format',
};
