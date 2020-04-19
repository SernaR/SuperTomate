'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeHighlight = sequelize.define('RecipeHighlight', {
    isSelected: DataTypes.BOOLEAN
  }, {});
  RecipeHighlight.associate = function(models) {
    // associations can be defined here
    models.RecipeHighlight.belongsTo(models.Recipe, {
      as: 'recipe',
      foreignKey: 'recipeId',
      allowNull: false
    }),
    models.RecipeHighlight.belongsTo(models.Highlight, {
      as: 'highlight',
      foreignKey: 'highlightId',
      allowNull: false
    })
  };
  return RecipeHighlight;
};