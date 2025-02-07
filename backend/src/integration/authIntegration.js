const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Person } = require('../models');
const { jwtSecret, tokenExpiration } = require('../config/auth');

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function comparePasswords(inputPassword, storedPassword) {
    return await bcrypt.compare(inputPassword, storedPassword);
}

function generateJWT(user) {
    return jwt.sign({ id: user.person_id, role: user.role_id }, jwtSecret, { expiresIn: tokenExpiration });
}

async function findUserByUsername(username) {
    return await Person.findOne({ where: { username } });
}

module.exports = { hashPassword, comparePasswords, generateJWT, findUserByUsername };
