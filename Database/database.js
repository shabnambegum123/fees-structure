const { Sequelize } = require("sequelize");


console.log(process.env.dialect,9876)
var sequelize = new Sequelize(
 process.env.database,
 process.env.user,
 process.env.password,
  {
    host:process.env.host,
    dialect:process.env.dialect,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });
module.exports = sequelize;
