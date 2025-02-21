const bcrypt = require('bcryptjs');
const { Person } = require('../models');

/**
 * Hashes a given password using bcrypt for secure storage.
 * 
 * @async
 * @function hashPassword
 * @param {string} password - The plain text password to be hashed.
 * @returns {Promise<string>} The hashed password.
 */

async function hashPassword(password) {
    console.log("Hashing password:", password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password Generated:", hashedPassword);
    return hashedPassword;
}

/**
 * Retrieves a user from the database by their username.
 * 
 * @async
 * @function findUserByUsername
 * @param {string} username - The username to search for in the database.
 * @returns {Promise<Object|null>} The user object if found, otherwise `null`.
 */

async function findUserByUsername(username) {
    return await Person.findOne({ where: { username } });
}

/*
async function comparePasswords(inputPassword, storedPassword) {
    console.log("Comparing passwords...");
    console.log("Entered Password (Plaintext):", inputPassword);
    console.log("Stored Password (Hashed):", storedPassword);

    try {
        if (!inputPassword || !storedPassword) {
            console.error("Missing password input!");
            return false;
        }

        // Use bcrypt.compare to check plain-text vs hashed password
        const match = await bcrypt.compare(inputPassword, storedPassword);
        console.log("Password Match:", match);
        return match;
    } catch (error) {
        console.error("Error comparing passwords:", error);
        return false;
    }
}
*/

/**
 * Compares an input password with the stored password.
 * 
 * @async
 * @function comparePasswords
 * @param {string} inputPassword - The plain text password entered by the user.
 * @param {string} storedPassword - The stored password in the database.
 * @returns {Promise<boolean>} `true` if passwords match, otherwise `false`.
 */

async function comparePasswords(inputPassword, storedPassword) {
    return inputPassword === storedPassword;
}



module.exports = { hashPassword, comparePasswords, findUserByUsername };
