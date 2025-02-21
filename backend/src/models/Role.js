const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection'); 

/**
 * Sequelize model for user roles.
 *
 * @typedef {Object} Role
 * @property {number} role_id - Unique identifier for the role (Primary Key).
 * @property {string} name - Name of the role (e.g., "Recruiter", "Applicant").
 */
const Role = sequelize.define('Role', {
    role_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255), allowNull: false }
}, { tableName: 'role', timestamps: false });

module.exports = Role;
