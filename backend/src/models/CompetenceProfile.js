const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");
/**
 * Sequelize model representing the CompetenceProfile table in the database.
 * 
 * @typedef {Object} CompetenceProfile
 * @property {number} competence_profile_id - Unique identifier for each competence profile entry.
 * @property {number} person_id - The identifier of the person associated with the competence profile.
 * @property {number} competence_id - The identifier of the competence associated with the profile.
 * @property {number} years_of_experience - The number of years of experience the person has in the given competence.
 */

const CompetenceProfile = sequelize.define(
  "CompetenceProfile",
  {
    competence_profile_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    person_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    competence_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    years_of_experience: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
    },
  },
  {
    tableName: "competence_profile",
    timestamps: false,
  }
);


module.exports = CompetenceProfile;