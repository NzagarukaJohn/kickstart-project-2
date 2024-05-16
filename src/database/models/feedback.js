'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feedback extends Model {
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
  feedback.init(
    {
      feedback: DataTypes.STRING,
      accomodationId: DataTypes.INTEGER,
      requesterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'feedback',
    },
  );
  return feedback;
};
