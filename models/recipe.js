'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    serve: DataTypes.INTEGER,
    making: DataTypes.INTEGER,
    cook: DataTypes.INTEGER
  }, {});
  Recipe.associate = function(models) {
    // associations can be defined here
    models.Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      allowNull: false
    }),
    models.Recipe.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      allowNull: false
      
    }),
    models.Recipe.hasMany(models.Comment)
    models.Recipe.hasMany(models.Step)
    models.Recipe.hasMany(models.Like)
    models.Recipe.hasMany(models.RecipeIngredient)
  };
  return Recipe;
};