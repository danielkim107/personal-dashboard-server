"use strict";

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

module.exports = function (sequelize) {
  var entry = sequelize.define('entry', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
  return entry;
};