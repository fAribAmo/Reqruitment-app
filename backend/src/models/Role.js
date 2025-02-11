const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection'); 

const Role = sequelize.define('Role', {
    role_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255), allowNull: false }
}, { tableName: 'role', timestamps: false });

module.exports = Role;
