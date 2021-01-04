"use strict";

var _sequelize = require("../../sequelize");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Teacher = _sequelize.sequelize.models.teacher;

function login(_x, _x2) {
  return _login.apply(this, arguments);
}

function _login() {
  _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var username, password, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            username = req.body.username;
            password = req.body.password;

            if (!(username && password)) {
              _context.next = 9;
              break;
            }

            _context.next = 5;
            return Teacher.findOne({
              where: {
                username: username,
                password: password
              },
              attributes: ['id', 'username']
            });

          case 5:
            user = _context.sent;

            if (user === null) {
              res.status(400).end();
            } else {
              res.status(200).send(user);
            }

            _context.next = 10;
            break;

          case 9:
            res.status(400).end();

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _login.apply(this, arguments);
}

;

function reset(_x3, _x4) {
  return _reset.apply(this, arguments);
}

function _reset() {
  _reset = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _sequelize.sequelize.sync({
              force: true
            });

          case 2:
            res.status(200).send('리셋했습니다');

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _reset.apply(this, arguments);
}

module.exports = {
  login: login,
  reset: reset
};