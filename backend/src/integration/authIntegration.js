const bcrypt = require('bcryptjs');
const { Person } = require('../models');


async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function comparePasswords(inputPassword, storedPassword) {
    return inputPassword === storedPassword; 
}

async function findUserByUsername(username) {
    return await Person.findOne({ where: { username } });
}

module.exports = { hashPassword, comparePasswords, findUserByUsername };
