'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ accomodation, tripRequest }) {
      this.hasMany(accomodation, {
        foreignKey: 'locationId',
        as: 'accomodation',
      });
      this.hasMany(tripRequest, {
        foreignKey: 'goingTo',
        as: 'tripRequest',
      });
    }
  }
  Location.init(
    {
      locationName: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'locations',
      modelName: 'Location',
    },
  );
  return Location;
};
