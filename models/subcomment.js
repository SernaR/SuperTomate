'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubComment = sequelize.define('SubComment', {
    content: DataTypes.TEXT,
    isChecked: DataTypes.BOOLEAN,
    isBlocked: DataTypes.BOOLEAN
  }, {});
  SubComment.associate = function(models) {
    // associations can be defined here
    models.SubComment.belongsTo(models.Comment, {
      foreignKey: 'commentId',
        allowNull: false
    }),
    models.SubComment.belongsTo(models.User, {
      foreignKey: 'userId',
      allowNull: false
    })
  };
  return SubComment;
};