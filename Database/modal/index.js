const sequelize = require("../database");

const studentProfile = require("./studentProfile");
const staffProfile = require("./staffprofile");
const feestructure = require("./feestructure");
const studentFeestruture = require("./studentFeestruture");

studentProfile.hasOne(studentFeestruture, {
  foreignKey: "studentId",
  as: "studentFeeDetails",
});

studentFeestruture.belongsTo(studentProfile, {
  foreignKey: "studentId",
  as: "studentDetails",
});

feestructure.hasMany(studentFeestruture, {
  foreignKey: "feestructureId",
  as: "studentDetails",
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = sequelize;
