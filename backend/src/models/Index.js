/** 
 *  @fileoverview
 * Initializes all Sequelize models and sets up their associations (relationships).
 * This module imports and exports all models and defines the necessary relationships between them.
*/
const sequelize = require('../config/dbConnection');
const Person = require('./User');
const Role = require('./Role');
const Availability = require('./Availability');
const Competence = require('./Competence');
const CompetenceProfile = require('./CompetenceProfile');

Role.hasMany(Person, { foreignKey: 'role_id' });
Person.belongsTo(Role, { foreignKey: 'role_id' });

Person.hasMany(Availability, { foreignKey: 'person_id' });
Availability.belongsTo(Person, { foreignKey: "person_id" });

Person.hasMany(CompetenceProfile, { foreignKey: 'person_id' });
CompetenceProfile.belongsTo(Person, { foreignKey: 'person_id' });

Competence.hasMany(CompetenceProfile, { foreignKey: 'competence_id' });
CompetenceProfile.belongsTo(Competence, { foreignKey: 'competence_id' });


module.exports = { sequelize, Person, Role, Availability, Competence, CompetenceProfile };