const bcrypt = require('bcryptjs');
const { Person } = require('../models');


async function hashPassword(password) {
    console.log("Hashing password:", password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password Generated:", hashedPassword);
    return hashedPassword;
}

async function findUserByUsername(username) {
    return await Person.findOne({ where: { username } });
}

/*
async function comparePasswords(inputPassword, storedPassword) {
    console.log("🔹 Comparing passwords...");
    console.log("🔹 Entered Password (Plaintext):", inputPassword);
    console.log("🔹 Stored Password (Hashed):", storedPassword);

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

async function comparePasswords(inputPassword, storedPassword) {
    return inputPassword === storedPassword;
}



module.exports = { hashPassword, comparePasswords, findUserByUsername };
