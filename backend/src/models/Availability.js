const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");


/**
 * Sequelize model representing the Availability table in the database.
 * 
 * @typedef {Object} Availability
 * @property {number} availability_id - Unique identifier for each availability entry.
 * @property {number} person_id - The identifier of the person who is available.
 * @property {string} from_date - The start date of the availability period.
 * @property {string} to_date - The end date of the availability period.
 */
const Availability = sequelize.define(
  "Availability",
  {
    availability_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    person_id: {
      type: DataTypes.INTEGER,
    },
    from_date: {
      type: DataTypes.DATEONLY,
    },
    to_date: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    tableName: "availability",
    timestamps: false,
  }
);

module.exports = Availability;