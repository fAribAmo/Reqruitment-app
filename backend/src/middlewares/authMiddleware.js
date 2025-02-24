/**
 * Middleware for handling authentication and authorization using JWT.
 * Provides functions for generating, verifying, and enforcing role-based access control.
 */

const jwt = require('jsonwebtoken');
const { jwtSecret, tokenExpiration } = require('../config/auth');

/**
 * Generates a JWT token for a given user.
 * 
 * @function generateJWT
 * @param {Object} user - The user object containing `person_id` and `role_id`.
 * @param {number} user.person_id - The unique ID of the user.
 * @param {number} user.role_id - The role ID of the user (e.g., 1 = Recruiter, 2 = Applicant).
 * @returns {string|null} The generated JWT token, or `null` if an error occurs.
 */
function generateJWT(user) {
    try {
        console.log("Generating JWT for user:", user.person_id, "Role:", user.role_id);
        console.log("JWT Secret:", jwtSecret);
        console.log("Token Expiration:", tokenExpiration);

        const token = jwt.sign(
            { id: user.person_id, role: user.role_id },  
            jwtSecret,  
            { expiresIn: tokenExpiration }  
        );

        console.log("JWT token generated:", token);
        return token;
    } catch (error) {
        console.error("Error generating JWT:", error);
        return null;
    }
}

/**
 * Middleware to authenticate a JWT token from the request headers.
 * If the token is valid, attaches the user payload to `req.user`.
 *
 * @function authenticateToken
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Callback function to proceed to the next middleware.
 * @returns {void} Sends `401 Unauthorized` if no token is provided, or `403 Forbidden` if invalid.
 */
function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    jwt.verify(token, jwtSecret, (err, user) => {        
        console.log("JWT Verification Error:", err);
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Session expired. Please log in again.' });
            }
            console.log("JWT Verification Error:", err);
            return res.status(403).json({ message: 'Invalid token.' });
        }        
        req.user = user;
        next();
    });
}

/**
 * Middleware to enforce role-based access control.
 * Only allows users with the specified roles to access the route.
 *
 * @function authorizeRoles
 * @param {number[]} allowedRoles - An array of allowed role IDs (e.g., `[1]` for Recruiters).
 * @returns {Function} Express middleware function that checks user roles.
 */
function authorizeRoles(allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access Denied" });
        }
        next();
    };
}


module.exports = { generateJWT, authenticateToken, authorizeRoles };
