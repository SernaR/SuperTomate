'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeIngredient = sequelize.define('RecipeIngredient', {
    quantity: DataTypes.INTEGER
  }, {});
  RecipeIngredient.associate = function(models) {
    // associations can be defined here
    models.RecipeIngredient.belongsTo(models.Unit, {
      foreignKey: 'unitId',
        allowNull: false
    }),
    models.RecipeIngredient.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
        allowNull: false
    }),
    models.RecipeIngredient.belongsTo(models.Ingredient, {
      foreignKey: 'ingredientId',
        allowNull: false
    })
  };
  return RecipeIngredient;
};