/**
 * Configuration for authentication settings.
 * Loads environment variables using dotenv.
 * @module config
 */
require('dotenv').config();

/**
 * Define jwtSecret and tokenExpiration to secure JWT-based authentication.
 * 
 * @typedef {Object} AuthConfig
 * @property {string} jwtSecret - Secret key for JWT signing, loaded from environment variables or defaulting to 'your_secret_key'.
 * @property {string} tokenExpiration - Token expiration duration (e.g., '1h' for one hour).
 */

module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'your_secret_key',
    tokenExpiration: '1h' 
};
