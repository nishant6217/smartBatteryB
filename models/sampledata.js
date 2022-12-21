'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SampleData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SampleData.init({
    name: DataTypes.STRING,
    criteria: DataTypes.STRING,
    value: DataTypes.INTEGER,
    days: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    createdby: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SampleData',
  });
  return SampleData;
};