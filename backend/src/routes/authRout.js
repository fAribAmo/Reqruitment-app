const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

/**
 * @module authRoutes
 * @description Defines authentication-related routes for user registration, login, and password setup.
 */

router.post('/register', register);
router.post('/login', login);


module.exports = router;
