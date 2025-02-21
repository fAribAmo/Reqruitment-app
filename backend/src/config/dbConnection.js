/**
 * DB connection using Sequlize ORM 
 * */

const { Sequelize } = require('sequelize');
require('dotenv').config();

// Debugging: Check if environment variables are loaded correctly
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);

//Establish connection
const sequelize = new Sequelize(
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

//Ensure database connection
sequelize.authenticate()
    .then(() => console.log('Database connection successful'))
    .catch(err => console.error('DB Connection Error:', err));

module.exports = sequelize;
