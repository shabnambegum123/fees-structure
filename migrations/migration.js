const sequelize = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("studentProfile", "profileImage", {
      type: sequelize.DataTypes.BIGINT,
      allowNull: false,
    });
  },

  // async down (queryInterface, Sequelize) {

  //     await queryInterface.removeColumn('users',);

  // }
};
