/**
 * Authentication controller handling API calls for user registration, login, and password management.
 * @module authController
 */
const { hashPassword, findUserByUsername } = require('../integration/authIntegration');
const { generateJWT } = require('../middlewares/authMiddleware');
const { Person } = require('../models');

/**
 * Registers a new user.
 * 
 * @async
 * @function register
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body containing user details.
 * @param {string} req.body.name - User's first name.
 * @param {string} req.body.surname - User's surname.
 * @param {string} req.body.pnr - User's personal number.
 * @param {string} req.body.email - User's email address.
 * @param {string} req.body.username - Chosen username.
 * @param {string} req.body.password - User's password.
 * @param {number} req.body.role_id - User's role ID.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Responds with JSON: `{ message: string }`.
 * @throws {Error} 400 - If username is already taken.
 * @throws {Error} 500 - If a server error occurs.
 */
async function register(req, res) {
    const { name, surname, pnr, email, username, password, role_id } = req.body;
    try {
        const existingUser = await findUserByUsername(username);
        if (existingUser) return res.status(400).json({ message: 'Username already taken' });

        /*
        console.log("Hashing password before storing...");
        const hashedPassword = await hashPassword(password);  //Ensure password is hashed
        console.log("Hashed Password:", hashedPassword);
        */

        await Person.create({ name, surname, pnr, email, username, password, role_id });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

/**
 * Logs in a user by verifying credentials and returning a JWT token.
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

        const user = await findUserByUsername(username);
     
        if (!user) {
            console.log("User not found:", username);
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User found:", user.username);
        console.log("Stored password in DB:", user.password);
        console.log("Entered password:", password);

        if (!user.password) {
            console.log("No password set for user:", username);
            return res.status(400).json({ message: 'Some fields are missing. Please create a password.' });
        }

        //Compare password in plain text
        if (password !== user.password) {
            console.log("Passwords do not match for:", username);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        console.log("Generating JWT token...");

        const token = generateJWT(user);
        
        console.log("Login successful!");

        //Send both token, person_id and role in response
        res.json({ 
            token, 
            role: user.role_id,  //Include role_id in response
            person_id: user.person_id,
            message: 'Login successful'
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
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
        const user = await findUserByUsername(username);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.password = await hashPassword(newPassword);
        await user.save();

        const token = generateJWT(user);
        res.json({ token, message: 'Password set successfully, you are now logged in' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { register, login, setPassword };
