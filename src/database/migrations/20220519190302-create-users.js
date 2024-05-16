'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      tinNumber: {
        type: Sequelize.STRING
      },
      IDNumber: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      passwordChangedAt: {
        type: Sequelize.DATE
      },
      passwordResetExpires: {
        type: Sequelize.DATE
      },
      passwordResetToken: {
        type: Sequelize.STRING
      },
      isVerified: {
        type: Sequelize.BOOLEAN
      },
      gender: {
        type: Sequelize.STRING
      },
      preferredLanguage: {
        type: Sequelize.STRING
      },
      verificationToken: {
        type: Sequelize.STRING
      },
      user_role: {
        type: Sequelize.ENUM('rra_admin', 'police_admin', 'ebm_claimer')
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
    await queryInterface.dropTable('users');
  }
};
