const sequelize = require("../database");

const studentProfile = require("./studentprofile");
const staffProfile = require("./staffprofile");
const feestructure = require("./feestructure");
const studentFeestruture = require("./studentFeestruture");

sequelize
  .sync({ force:false })
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log(error);
  })
 

module.exports = sequelize;

// let data = ['hello','hii']  // convert array to object

// let result = Object.assign({},data)
// console.log(result)

