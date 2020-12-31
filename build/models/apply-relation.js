"use strict";

function applyRelation(sequelize) {
  var _sequelize$models = sequelize.models,
      entry = _sequelize$models.entry,
      user = _sequelize$models.user;
  entry.belongsTo(user, {
    foreignKey: 'userId'
  });
}

module.exports = {
  applyRelation: applyRelation
};