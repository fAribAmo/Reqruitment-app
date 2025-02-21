/**
 * @file Entry point for the Express.js backend server.
 * Configures middleware, routes, database connection, and starts the server.
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRout');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;


/**
 * Enables CORS to allow communication between frontend and backend.
 * 
 * @middleware
 */
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

/**
 * Middleware to parse incoming JSON requests.
 * 
 * @middleware
 */
app.use(express.json());

/**
 * Authentication Routes.
 * Handles login, registration, and authentication-related endpoints.
 * 
 * @route {POST} /api/auth
 */
app.use('/api/auth', authRoutes);

/**
 * Root route to check if the backend is running.
 * 
 * @route {GET} /
 * @returns {string} A simple message indicating the server is running.
 */
app.get('/', (req, res) => {
    res.send("Backend is running!");
});

/**
 * Establishes a connection to the database using Sequelize ORM.
 * 
 * @returns {Promise<void>} Logs success or error message.
 */
sequelize.sync().then(() => console.log('Database connected successfully')).catch(err => console.error('DB Error:', err));

/**
 * Starts the Express server and listens on the specified port.
 * 
 * @event listen
 * @param {number} PORT - The port on which the server listens.
 */
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
