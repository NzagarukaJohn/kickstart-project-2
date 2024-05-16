module.exports = (sequelize, DataTypes) => {
  const ebmClaimRequest = sequelize.define(
    'ebmClaimRequest',
    {
      claimReason: DataTypes.ENUM('lost', 'stolen', 'damaged', 'other'),
      claimDetails: DataTypes.STRING,
      dateOfTheCase: DataTypes.STRING,
      place: DataTypes.STRING,
      rraReviewStatus: DataTypes.ENUM('pending', 'approved', 'rejected'),
      policeReviewStatus: DataTypes.ENUM('pending', 'approved', 'rejected'),
      claimerId: DataTypes.INTEGER,
    },
    {},
  );
  
  ebmClaimRequest.associate = function (models) {
    // associations can be defined here
    ebmClaimRequest.belongsTo(models.users, {
      foreignKey: 'claimerId',
      onDelete: 'CASCADE'
    });
  };
  return ebmClaimRequest;
};
