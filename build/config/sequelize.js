"use strict";

var Sequelize = require('sequelize');

var sequelize = new Sequelize('db', 'postgres', 'postgres', {
  dialect: 'postgres',
  host: '127.0.0.1',
  port: 5432
});
sequelize.authenticate().then(function () {
  console.log('Connection has been established successfully.');
})["catch"](function (err) {
  console.error('Unable to connect to the database:', err);
});