const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");

/**
 * Sequelize model representing the Competence table in the database.
 * 
 * @typedef {Object} Competence
 * @property {number} competence_id - Unique identifier for each competence entry.
 * @property {string} name - The name of the competence.
 */
const Competence = sequelize.define(
  "Competence",
  {
    competence_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "competence", timestamps: false }
);
module.exports = Competence;
