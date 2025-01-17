'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    serve: DataTypes.INTEGER,
    making: DataTypes.INTEGER,
    cook: DataTypes.INTEGER,
    wait: DataTypes.INTEGER,
    picture: DataTypes.STRING,
    isDraft: DataTypes.BOOLEAN,
    slug: DataTypes.STRING
  }, {});
  Recipe.associate = function(models) {
    // associations can be defined here
    models.Recipe.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
      allowNull: false
    }),
    models.Recipe.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'categoryId',
      allowNull: false
      
    }),
    models.Recipe.belongsTo(models.Difficulty, {
      as: 'difficulty',
      foreignKey: 'difficultyId',
      allowNull: false
      
    }),
    models.Recipe.hasMany(models.Comment, {as: 'comments'})
    models.Recipe.hasMany(models.Step, {as: 'steps'})
    models.Recipe.hasMany(models.Like,{as: 'likes'})
    models.Recipe.hasMany(models.Ingredient, {as: 'ingredients'})
    models.Recipe.belongsToMany(models.Tag, { as: 'tags', through: 'RecipeTag', foreignKey: 'recipeId' });
  };
  return Recipe;
};