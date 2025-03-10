/**
 * Authentication controller handling API calls for user registration, login, and password management.
 * @module authController
 */
const { createUser, findUserByUsername } = require('../integration/authIntegration');
const { generateJWT } = require('../middlewares/authMiddleware');
const { withTransaction } = require('../integration/transactionManager.js');


/**
 * Registers a new user.
 * 
 * @async
 * @function register
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Responds with `{ message: string }`
 */
async function register(req, res) {
    const { name, surname, pnr, email, username, password, role_id } = req.body;
    try {
        await withTransaction(async (t) => {
            const existingUser = await findUserByUsername(username, t);
            if (existingUser) throw new Error('Username already taken');

            await createUser({ name, surname, pnr, email, username, password, role_id }, t);
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error.message === 'Username already taken') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Server error' });
    }
}


/**
 * Logs in a user by verifying credentials and returning a JWT token and person_id
 * 
 * @async
 * @function login
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body containing credentials.
 * @param {string} req.body.username - User's username.
 * @param {string} req.body.password - User's password.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Responds with JSON: `{ token: string, role: number, message: string }`.
 * @throws {Error} 404 - If user is not found.
 * @throws {Error} 400 - If password is missing.
 * @throws {Error} 401 - If credentials are invalid.
 * @throws {Error} 500 - If a server error occurs.
 */
async function login(req, res) {
    const { username, password } = req.body;

    try {
        console.log("Login attempt for:", username);

        let user; // Store user data outside the transaction
        let token; // Store token to use after transaction

        await withTransaction(async (t) => {
            user = await findUserByUsername(username, t);
            if (!user) throw new Error("User not found");

            console.log("User found:", user.username);
            console.log("Stored password in DB:", user.password);
            console.log("Entered password:", password);

            if (!user.password) throw new Error("Some fields are missing. Please create a password.");
            if (password !== user.password) throw new Error("Invalid credentials");

            console.log("Generating JWT token...");
            token = generateJWT(user);
        });

        console.log("Login successful!");

        // Send response AFTER transaction completes
        res.json({
            token,
            role: user.role_id, // Include role_id in response
            person_id: user.person_id,
            message: "Login successful",
        });

    } catch (error) {
        console.log("Transaction failed:", error.message);
    
        let status = 500; // Default to server error
    
        if (error.message === "User not found") {
            status = 404;
        } else if (error.message.includes("fields are missing")) {
            status = 400;
        } else if (error.message === "Invalid credentials") {
            status = 401;
        }
    
        res.status(status).json({ message: error.message });
    }    
}


/**
 * Sets a new password for a user who do not have one
 * @async
 * @function setPassword
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body containing credentials.
 * @param {string} req.body.username - User's username.
 * @param {string} req.body.newPassword - New password to set.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Responds with JSON: `{ token: string, message: string }`.
 * @throws {Error} 404 - If user is not found.
 * @throws {Error} 500 - If a server error occurs.
 */
async function setPassword(req, res) {
    const { username, newPassword } = req.body;
    try {
        let token;
        await withTransaction(async (t) => {
        const user = await findUserByUsername(username, t);
        if (!user) throw new Error("User not found");
        
        user.password = await hashPassword(newPassword);
        await user.save({ transaction: t });

       token = generateJWT(user);
    });    
        res.json({ token, message: 'Password set successfully, you are now logged in' });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { register, login, setPassword };
