/**
 * Sequelize model defining the Competence Profile table in the database.
 *
 * @typedef {Object} CompetenceProfile
 * @property {number} competence_profile_id - Unique identifier for the competence profile (Primary Key).
 * @property {number} person_id - Foreign key linking to the person associated with this competence profile.
 * @property {number} competence_id - Foreign key linking to the specific competence (skill or expertise) for this profile.
 * @property {number} years_of_experience - The number of years of experience the person has in this competence.
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");


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