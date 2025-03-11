/**
 * @fileoverview Database connection setup using Sequelize ORM with CLS for transaction management.
 * Supports PostgreSQL and can connect using either a DATABASE_URL (for cloud-based deployment) 
 * or environment variables (for local development).
 * 
 * - Uses `cls-hooked` to enable automatic transaction management.
 * - Supports SSL for secure cloud-based PostgreSQL connections.
 * - Logs connection status and errors for debugging.
 * 
 * @module database
 */
const { Sequelize } = require('sequelize');
require('dotenv').config();
const cls = require("cls-hooked");

const namespace = cls.createNamespace("transaction-namespace");
Sequelize.useCLS(namespace);

const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,  
                rejectUnauthorized: false 
            }
        }
    })
    : new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT || 5432,
            dialect: 'postgres',
            logging: false
        }
    );

// Debugging: Check if DATABASE_URL is being used
console.log('Using DATABASE_URL:', !!process.env.DATABASE_URL);

/**
 * Authenticates the database connection.
 * Logs a success message if successful, otherwise logs an error.
 * 
 * @function sequelize.authenticate
 * @returns {Promise<void>} Resolves if connection is successful, rejects with an error otherwise.
 */
sequelize.authenticate()
    .then(() => console.log('Database connection successful'))
    .catch(err => console.error('DB Connection Error:', err));


module.exports = sequelize;
module.exports.namespace = namespace;


