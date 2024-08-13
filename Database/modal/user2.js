const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const user = sequelize.define(
  "staffProfile",
  {
    staffId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EamilId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Role: {
      type: DataTypes.ENUM("Student", "Staff"),
      allowNull: false,
    },
    Designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = user;
