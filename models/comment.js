'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT,
    isChecked: DataTypes.BOOLEAN,
    isBlocked: DataTypes.BOOLEAN,
    isReaded: DataTypes.BOOLEAN
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    models.Comment.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
      allowNull: false
    }),
    models.Comment.belongsTo(models.Recipe, {
      as: 'recipe',
      foreignKey: 'recipeId',
        allowNull: false
    }),
    models.Comment.hasMany(models.SubComment)
  };
  return Comment;
};