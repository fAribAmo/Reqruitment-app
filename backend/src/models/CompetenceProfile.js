
/**
 * Sequelize model defining the Competence Profile table in the database.
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Person = require("./User");
const Competence = require("./Competence");

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
