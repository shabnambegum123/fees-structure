const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const feestructure = sequelize.define(
  "feestructure",
  {
    feestrutureId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true,
    },
    Designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TuitionFee: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    BusFee: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    BookFee: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    FirstGraduate_discount : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Reserved_students_Discount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TotalAmount: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },is_deleted: {
      type : DataTypes.BOOLEAN,
      defaultValue : false
    }
  },
  {
    timestamps: true,
  }
)



module.exports = feestructure;
