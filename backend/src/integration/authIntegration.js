const { Person } = require('../models');

/**
 * Retrieves a user from the database by their username.
 * 
 * @async
 * @function findUserByUsername
 * @param {string} username - The username to search for in the database.
 * @returns {Promise<Object|null>} The user object if found, otherwise `null`.
 */

async function findUserByUsername(username) {
    return await Person.findOne({
        where: { username }
    });
}

/**
 * Creates a new user in the database.
 * @async
 * @function createUser
 * @param {Object} userData - The user data to save in the database.
 * @returns {Promise<Object>} The newly created user.
 */
async function createUser(userData) {
    return await Person.create(userData); 
}



module.exports = { findUserByUsername, createUser };
