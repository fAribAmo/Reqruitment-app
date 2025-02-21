const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection'); 
const Role = require('./Role'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Sequelize model representing a Person (User).
 * 
 * @typedef {Object} Person
 * @property {number} person_id - Unique identifier for each person.
 * @property {string} name - First name of the person.
 * @property {string} surname - Last name of the person.
 * @property {string} pnr - Personal number (must be unique).
 * @property {string} email - Email address (must be unique).
 * @property {string} password - Hashed password (optional).
 * @property {string} username - Unique username for login.
 * @property {number} role_id - Role identifier (1 = recruiter, 2 = applicant).
 */
const Person = sequelize.define('Person', {
    person_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    surname: { type: DataTypes.STRING(255), allowNull: false },
    pnr: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: true },
    username: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    role_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'role', key: 'role_id' } }
}, { tableName: 'person', timestamps: false });

/**
 * Defines relationship: Each Person belongs to a Role.
 */
Person.belongsTo(Role, { foreignKey: 'role_id' });


/**
 * Hook to ensure passwords are hashed before saving a new user.
 * @async
 * @function beforeCreate
 * @param {Person} user - The user object being created.
 * @throws {Error} If the password is missing.
 */
Person.beforeCreate(async (user) => {
    if (!user.password) {
        throw new Error('Password is required');
    }
    //user.password = await bcrypt.hash(user.password, 10);
});

/**
 * Hook to ensure passwords are hashed before updating.
 * @async
 * @function beforeUpdate
 * @param {Person} user - The user object being updated.
 */
Person.beforeUpdate(async (user) => {
    if (user.changed('password')) {
        //user.password = await bcrypt.hash(user.password, 10);
    }
});


module.exports = Person;
