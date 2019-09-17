'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    isActive: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    models.User.hasMany(models.Recipe),
    models.User.hasMany(models.Comment)
    models.User.hasMany(models.Like)
  };
  return User;
};