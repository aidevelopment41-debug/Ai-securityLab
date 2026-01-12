// Auth types as JSDoc comments

/**
 * @typedef {Object} LoginCredentials
 * @property {string} username
 * @property {string} password
 */

/**
 * @typedef {Object} RegisterData
 * @property {string} username
 * @property {string} email
 * @property {string} password
 * @property {string} [full_name]
 */

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} username
 * @property {string} email
 * @property {string} [full_name]
 * @property {boolean} is_active
 * @property {boolean} is_superuser
 */

/**
 * @typedef {Object} AuthResponse
 * @property {string} access_token
 * @property {string} token_type
 */

/**
 * @typedef {Object} ApiError
 * @property {string} [detail]
 * @property {string} [message]
 * @property {string} [error]
 */

export {};
