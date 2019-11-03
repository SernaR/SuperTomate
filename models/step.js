'use strict';
module.exports = (sequelize, DataTypes) => {
  const Step = sequelize.define('Step', {
    rank: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});
  Step.associate = function(models) {
    // associations can be defined here
    models.Step.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      allowNull: false
    })
  };
  return Step;
};