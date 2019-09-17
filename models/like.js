'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    liked: DataTypes.INTEGER
  }, {});
  Like.associate = function(models) {
    // associations can be defined here
    models.Like.belongsTo(models.User, {
      foreignKey: 'userId',
        allowNull: false
    }),
    models.Like.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
        allowNull: false
    })
  };
  return Like;
};