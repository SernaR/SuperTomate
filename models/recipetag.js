'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeTag = sequelize.define('RecipeTag', {
  }, {});
  RecipeTag.associate = function(models) {
    // associations can be defined here
    models.RecipeTag.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      allowNull: false
    }),
    models.RecipeTag.belongsTo(models.Tag, {
      foreignKey: 'tagId',
      allowNull: false
      
    })
  };
  return RecipeTag;
};