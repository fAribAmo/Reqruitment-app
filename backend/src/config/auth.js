require('dotenv').config();

module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'your_secret_key',
    tokenExpiration: '1h' 
};
