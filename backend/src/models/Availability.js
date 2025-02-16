/**
 * Sequelize model defining the Availability table in the database.
 */
const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");
const Person = require("./User");

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
Availability.belongsTo(Person, { foreignKey: "person_id" });

module.exports = Availability;
