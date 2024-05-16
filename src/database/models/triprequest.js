module.exports = (sequelize, DataTypes) => {
  const tripRequest = sequelize.define(
    'tripRequest',
    {
      leavingFrom: DataTypes.STRING,
      goingTo: DataTypes.INTEGER,
      travelDate: DataTypes.STRING,
      returnDate: DataTypes.STRING,
      travelReason: DataTypes.STRING,
      tripType: DataTypes.STRING,
      status: DataTypes.ENUM('pending', 'approved', 'rejected'),
      passportName: DataTypes.STRING,
      passportNumber: DataTypes.STRING,
    },
    {},
  );
  tripRequest.associate = function (models) {
    tripRequest.belongsTo(models.users, {
      foreignKey: 'requesterId',
    });
    tripRequest.belongsTo(models.Room, {
      foreignKey: 'roomId',
    });
    tripRequest.belongsTo(models.accomodation, {
      foreignKey: 'accomodationId',
    });

    tripRequest.belongsTo(models.Location, {
      foreignKey: 'goingTo',
    });
    // associations can be defined here
  };
  return tripRequest;
};
