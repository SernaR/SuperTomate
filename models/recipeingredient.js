'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeIngredient = sequelize.define('RecipeIngredient', {
    rank: DataTypes.INTEGER,
    content: DataTypes.STRING,
  }, {});
  RecipeIngredient.associate = function(models) {
    // associations can be defined here
    models.RecipeIngredient.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
        allowNull: false
    })/*,
    models.RecipeIngredient.belongsTo(models.Ingredient, {
      foreignKey: 'ingredientId',
        allowNull: false
    }),
    models.RecipeIngredient.belongsTo(models.Unit, {
      foreignKey: 'unitId',
        allowNull: false
    })*/
  };
  return RecipeIngredient;
};