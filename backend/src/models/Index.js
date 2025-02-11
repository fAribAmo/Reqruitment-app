/**Initial all models and db connection */
const sequelize = require('../config/dbConnection'); 
const Person = require('./User'); 
const Role = require('./Role'); 

module.exports = { sequelize, Person, Role };
