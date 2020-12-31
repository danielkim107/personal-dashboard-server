"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = void 0;

var _applyRelation = require("./apply-relation");

var Sequelize = require('sequelize');

var sequelize = new Sequelize('db', 'postgres', 'postgres', {
  dialect: 'postgres',
  host: '127.0.0.1',
  port: 5432
});
exports.sequelize = sequelize;
var modelDefiners = [require('./user'), require('./entry')];

for (var _i = 0, _modelDefiners = modelDefiners; _i < _modelDefiners.length; _i++) {
  var modelDefiner = _modelDefiners[_i];
  modelDefiner(sequelize);
}

(0, _applyRelation.applyRelation)(sequelize);