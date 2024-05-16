'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rates extends Model {
    static associate({ accomodation }) {
      this.belongsTo(accomodation, {
        foreignKey: 'accomodationId',
        as: 'accomodation',
      });
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        accomodationId: undefined,
      };
    }
  }
  rates.init(
    {
      rating: DataTypes.FLOAT,
      accomodationId: DataTypes.INTEGER,
      requesterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'rates',
    },
  );
  rates.associate = function (models) {
    rates.belongsTo(models.users, {
      foreignKey: 'requesterId',
    });
  };
  return rates;
};
