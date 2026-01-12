// API Response constants
export const API_TIMEOUT = 10000;
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// App constants
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'AI Security Lab';
export const APP_VERSION = process.env.NEXT_PUBLIC_VERSION || '1.0.0';

// HTTP Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  GENERIC_ERROR: 'An error occurred. Please try again.',
};
