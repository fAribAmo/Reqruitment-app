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
        await withTransaction(async () => {
            
            const existingUser = await findUserByUsername(username);
            if (existingUser) throw new Error('Username already taken');

            try {
                await createUser({ name, surname, pnr, email, username, password, role_id });
                console.log("User created successfully!");
            } catch (error) {
                console.error("Failed to create user:", error.message);
                throw new Error("Database error occurred while creating user");
            }
           
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Registration failed:", error.message);
        console.error("Stack Trace:", error.stack);
        res.status(500).json({ message: "Server error" });
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

        await withTransaction(async () => {
            try {
                user = await findUserByUsername(username);
                if (!user) throw new Error("User not found");
            } catch (error) {
                console.error("Database query failed:", error.message);
                throw new Error("User not found"); 
            }

            console.log("User found:", user.username);

            if (!user.password) throw new Error("Some fields are missing. Please create a password.");
            if (password !== user.password) {
                console.error("Invalid credentials for user:", user.username);
                throw new Error("Invalid credentials");
            }

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
        console.error("Stack Trace:", error.stack);
    
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


module.exports = { register, login };
