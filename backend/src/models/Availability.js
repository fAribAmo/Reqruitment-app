/**
 * Sequelize model defining the Availability table in the database.
 *
 * @typedef {Object} Availability
 * @property {number} availability_id - Unique identifier for the availability record (Primary Key).
 * @property {number} person_id - Identifier for the person associated with the availability (Foreign Key).
 * @property {string} from_date - The start date of the availability period.
 * @property {string} to_date - The end date of the availability period.
 */
const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");

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