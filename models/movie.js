'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Producer);
      this.belongsTo(models.Genre);
    }
  };
  Movie.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    year: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};
