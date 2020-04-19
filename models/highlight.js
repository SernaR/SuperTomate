'use strict';
module.exports = (sequelize, DataTypes) => {
  const Highlight = sequelize.define('Highlight', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {});
  Highlight.associate = function(models) {
    // associations can be defined here
  };
  return Highlight;
};