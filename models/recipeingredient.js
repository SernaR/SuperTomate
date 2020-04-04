'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    rank: DataTypes.INTEGER,
    content: DataTypes.STRING,
  }, {});
  Ingredient.associate = function(models) {
    // associations can be defined here
    models.Ingredient.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
        allowNull: false
    })
  };
  return Ingredient;
};