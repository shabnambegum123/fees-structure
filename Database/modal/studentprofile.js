const { DataTypes, BOOLEAN } = require("sequelize");
const sequelize = require("../database");
const {} = require("../database");
const studentFeestruture = require("./studentFeestruture");
const studentProfile = sequelize.define(
  "studentProfile",
  {
    profileId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
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
      type: DataTypes.ENUM("student"),
      allowNull: false,
    },
    Designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_FirstGraduate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currentYear: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    feestructureId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    studentFeestrutureId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    mobileNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_suspended: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
)

//studentProfile.belongsTo(studentFeestruture,{foreignKey:"studentFeestrutureId",as:"studentFeeDetails"})

module.exports = studentProfile
