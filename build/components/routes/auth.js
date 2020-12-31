"use strict";

var _models = require("../../models");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
            return _models.models.User.findOne({
              where: {
                username: username,
                password: password
              },
              attributes: ['id', 'username']
            });

          case 5:
            user = _context.sent;

            if (user === null) {
              res.status(400).send({
                message: 'Incorrect username and/or password!'
              });
            } else {
              res.status(200).send({
                message: 'User has been authenticated.',
                user: user
              });
            }

            _context.next = 10;
            break;

          case 9:
            res.status(400).send({
              message: 'Incorrect username and/or password!'
            });

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
module.exports = {
  login: login
};