"use strict";

var _models = require("../../models");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = _models.sequelize.models.user;

function getList(_x, _x2) {
  return _getList.apply(this, arguments);
}

function _getList() {
  _getList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var users;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return User.findAll({
              attributes: ['id', 'username'],
              order: [['id', 'DESC']]
            });

          case 2:
            users = _context.sent;
            res.status(200).send(users);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getList.apply(this, arguments);
}

;

function getById(_x3, _x4) {
  return _getById.apply(this, arguments);
}

function _getById() {
  _getById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = parseInt(req.params.id);
            _context2.next = 3;
            return User.findByPk(id);

          case 3:
            user = _context2.sent;

            if (entry) {
              res.status(200).send(user);
            } else {
              res.status(400).send({
                message: 'User not found. '
              });
            }

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getById.apply(this, arguments);
}

;

function create(_x5, _x6) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var body;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            body = {
              username: req.body.username,
              password: req.body.password
            };
            _context3.next = 3;
            return User.create(body);

          case 3:
            res.status(201).end();

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _create.apply(this, arguments);
}

;

function update(_x7, _x8) {
  return _update.apply(this, arguments);
}

function _update() {
  _update = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, body;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = parseInt(req.params.id);
            body = {
              username: req.body.usrename,
              password: req.body.password
            };
            _context4.next = 4;
            return User.update(body, {
              where: {
                id: id
              }
            });

          case 4:
            res.status(200).end();

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _update.apply(this, arguments);
}

;

function remove(_x9, _x10) {
  return _remove.apply(this, arguments);
}

function _remove() {
  _remove = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = parseInt(req.params.id);
            _context5.next = 3;
            return User.destroy({
              where: {
                id: id
              }
            });

          case 3:
            res.status(204).end();

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _remove.apply(this, arguments);
}

;
module.exports = {
  getList: getList,
  getById: getById,
  create: create,
  update: update,
  remove: remove
};