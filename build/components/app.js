"use strict";

require("core-js/stable");

require("regenerator-runtime/runtime");

var _express = _interopRequireDefault(require("express"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var modelRoutes = {
  auth: require('./routes/auth'),
  entry: require('./routes/entry'),
  user: require('./routes/user')
};
var app = (0, _express["default"])();
app.use((0, _morgan["default"])('short'));
app.use(_express["default"]["static"]('./public'));
app.use(_express["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use((0, _cors["default"])());
app.use((0, _expressSession["default"])({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true
}));
app.get('/', function (req, res) {
  res.send('Hello World');
});

for (var _i = 0, _Object$entries = Object.entries(modelRoutes); _i < _Object$entries.length; _i++) {
  var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      routeName = _Object$entries$_i[0],
      routeController = _Object$entries$_i[1];

  if (routeController.getList) {
    app.get("/api/".concat(routeName), routeController.getList);
  }

  if (routeController.getById) {
    app.get("/api/".concat(routeName, "/:id"), routeController.getById);
  }

  if (routeController.create) {
    app.post("/api/".concat(routeName), routeController.create);
  }

  if (routeController.update) {
    app.put("/api/".concat(routeName, "/:id"), routeController.update);
  }

  if (routeController.remove) {
    app["delete"]("/api/".concat(routeName, "/:id"), routeController.remove);
  }

  if (routeController.login) {
    app.post("/api/".concat(routeName, "/login"), routeController.login);
  }
}

module.exports = app;