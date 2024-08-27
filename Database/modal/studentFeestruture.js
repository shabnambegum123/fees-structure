const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const studentFeestruture = sequelize.define(
  "studentFeestruture",
  {
    studentFeestrutureId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    studentId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    Designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    feestructureId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
   
    paidStatus: {
      type: DataTypes.ENUM("pending","success","failure"),
      defaultValue:"pending",
      allowNull: false,
    },
    TotalAmount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    fineAmount: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    is_deleted: {
      type : DataTypes.BOOLEAN,
      defaultValue : false
    }
  },
  {
    timestamps: true,
  }
);

module.exports = studentFeestruture;
