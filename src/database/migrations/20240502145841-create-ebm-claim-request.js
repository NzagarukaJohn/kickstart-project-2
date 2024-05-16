'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ebmClaimRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      claimReason: {
        type: Sequelize.ENUM('lost', 'stolen', 'damaged', 'other')
      },
      claimDetails: {
        type: Sequelize.STRING
      },
      dateOfTheCase: {
        type: Sequelize.STRING
      },
      place: {
        type: Sequelize.STRING
      },
      rraReviewStatus: {
        type: Sequelize.ENUM('pending', 'approved', 'rejected')
      },
      policeReviewStatus: {
        type: Sequelize.ENUM('pending', 'approved', 'rejected')
      },
      claimerId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ebmClaimRequests');
  }
};
