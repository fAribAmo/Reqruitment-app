/**
 * @file Entry point for the Express.js backend server.
 * Configures middleware, routes, database connection, and starts the server.
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRout');
const appliRoutes = require('./routes/appliRout');
const recRoutes = require('./routes/recRout');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;


/**
 * Enables CORS to allow communication between frontend and backend.
 * 
 * @middleware
 */
const allowedOrigins = [
    "https://reqruitment-frontend.onrender.com", 
    "http://localhost:5173" 
  ];
  
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }
    
    if (req.method === "OPTIONS") {
      return res.sendStatus(200); // Respond to preflight requests
    }
  
    next();
  });


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
 * Application Routes.
 * Handles job application submissions by authenticated applicants.
 * 
 * @route {POST} /api/apply
 */
app.use('/api', appliRoutes);

/**
 * Recruiter Routes.
 * Handles routes related to recruiters, including job application data retrieval and management.
 * These routes are accessible only to authenticated recruiters. 
 * 
 * @route {GET} /api/recruiter - Fetches all job applications.
 */
app.use('/api', recRoutes);

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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


