/**
 * Authenticates API requests by verifying JWT and allowing access only if the token is valid.  
 * */


const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/auth');


//Generate JWT Token 
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

//Verify JWT token
function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token.' });
        req.user = user;
        next();
    });
}

//Enforce role-based access control
function authorizeRoles(allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access Denied" });
        }
        next();
    };
}


module.exports = { generateJWT, authenticateToken, authorizeRoles };
