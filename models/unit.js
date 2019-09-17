'use strict';
module.exports = (sequelize, DataTypes) => {
  const Unit = sequelize.define('Unit', {
    name: DataTypes.STRING
  }, {});
  Unit.associate = function(models) {
    // associations can be defined here
    models.Unit.hasMany(models.RecipeIngredient)
  };
  return Unit;
};