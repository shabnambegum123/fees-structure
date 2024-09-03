const sequelize = require("sequelize")
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'studentProfile', 
      'profileImage', 
      {
        type: sequelize.BIGINT,
        allowNull: true
      }
    )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('studentProfile', 'age');
  }
}

