'use strict';
const { Model } = require('sequelize');
export default (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      tinNumber: DataTypes.STRING,
      IDNumber: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      passwordChangedAt: DataTypes.DATE,
      passwordResetExpires: DataTypes.DATE,
      passwordResetToken: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN,
      gender: DataTypes.STRING,
      preferredLanguage: DataTypes.STRING,
      verificationToken: DataTypes.STRING,
      user_role: DataTypes.ENUM(
        'rra_admin',
        'police_admin',
        'ebm_claimer',
      ),
    },
    {
      sequelize,
      modelName: 'users',
    },
  );

  return user;
};
