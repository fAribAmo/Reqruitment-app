/**
 * Initializes all models and sets up the database connection.
 * 
 * @module models/index
 */
const sequelize = require('../config/dbConnection'); 
const Person = require('./User'); 
const Role = require('./Role'); 

module.exports = { sequelize, Person, Role };
