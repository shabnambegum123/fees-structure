const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const staffprofile = sequelize.define(
  "staffProfile",
  {
    staffId: {
    type: DataTypes.INTEGER,
    autoIncrement:true,
      primaryKey: true,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EmailId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Role: {
      type: DataTypes.ENUM("Staff"),
      allowNull: false,
    },
    Designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    initialAutoIncrement: 1000,
  },
  {
    timestamps: true,
  }
);

module.exports = staffprofile;
