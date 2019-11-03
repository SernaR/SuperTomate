'use strict';
module.exports = (sequelize, DataTypes) => {
  const Difficulty = sequelize.define('Difficulty', {
    name: DataTypes.STRING
  }, {});
  Difficulty.associate = function(models) {
    // associations can be defined here
    models.Difficulty.hasMany(models.Recipe)
  };
  return Difficulty;
};