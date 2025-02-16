/**
 * Sequelize model defining the Competence table in the database.
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");

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

