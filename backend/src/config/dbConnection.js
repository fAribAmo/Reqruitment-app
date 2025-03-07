/**
 * DB connection using Sequlize ORM 
 * */
const { Sequelize } = require('sequelize');
require('dotenv').config();

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

// Ensure database connection
sequelize.authenticate()
    .then(() => console.log('Database connection successful'))
    .catch(err => console.error('DB Connection Error:', err));

module.exports = sequelize;

