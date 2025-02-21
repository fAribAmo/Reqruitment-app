const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection'); 
const Role = require('./Role'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

// Define relationships
Person.belongsTo(Role, { foreignKey: 'role_id' });

//Ensure passwords are hashed before saving
Person.beforeCreate(async (user) => {
    if (!user.password) {
        throw new Error('Password is required');
    }
    user.password = await bcrypt.hash(user.password, 10);
});

Person.beforeUpdate(async (user) => {
    if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});


module.exports = Person;
