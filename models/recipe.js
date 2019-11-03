'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    serve: DataTypes.INTEGER,
    making: DataTypes.INTEGER,
    cook: DataTypes.INTEGER,
    difficulty: DataTypes.INTEGER,
    isDraft: DataTypes.BOOLEAN
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
    models.Recipe.belongsTo(models.Difficulty, {
      foreignKey: 'difficultyId',
      allowNull: false
      
    }),
    models.Recipe.hasMany(models.Comment, {as: 'Comments'})
    models.Recipe.hasMany(models.Step, {as: 'Steps'})
    models.Recipe.hasMany(models.Like,{as: 'Likes'})
    models.Recipe.hasMany(models.RecipeIngredient, {as: 'RecipeIngredients'})
    models.Recipe.hasMany(models.RecipeTag, {as: 'RecipeTags'})
  };
  return Recipe;
};