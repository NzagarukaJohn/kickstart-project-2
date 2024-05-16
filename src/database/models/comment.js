'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      tripRequestId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      comment: DataTypes.STRING,
    },
    {},
  );
  Comment.associate = function (models) {
    // associations can be defined here
    Comment.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Comment.belongsTo(models.tripRequest, {
      foreignKey: 'tripRequestId',
      onDelete: 'CASCADE',
    });
  };
  return Comment;
};
