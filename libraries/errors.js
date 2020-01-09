"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnknownError = exports.InternalServerError = exports.ForbiddenError = exports.UnauthorizedError = undefined;

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UnauthorizedError = exports.UnauthorizedError = function (_Error) {
  (0, _inherits3.default)(UnauthorizedError, _Error);

  function UnauthorizedError(msg) {
    var _ret;

    (0, _classCallCheck3.default)(this, UnauthorizedError);

    var _this = (0, _possibleConstructorReturn3.default)(this, (UnauthorizedError.__proto__ || (0, _getPrototypeOf2.default)(UnauthorizedError)).call(this));

    return _ret = {
      statusCode: 401,
      msg: "[Unauthorized Error]: " + msg
    }, (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  return UnauthorizedError;
}(Error);

var ForbiddenError = exports.ForbiddenError = function (_Error2) {
  (0, _inherits3.default)(ForbiddenError, _Error2);

  function ForbiddenError(msg) {
    var _ret2;

    (0, _classCallCheck3.default)(this, ForbiddenError);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (ForbiddenError.__proto__ || (0, _getPrototypeOf2.default)(ForbiddenError)).call(this));

    return _ret2 = {
      statusCode: 403,
      msg: "[Forbidden Error]: " + msg
    }, (0, _possibleConstructorReturn3.default)(_this2, _ret2);
  }

  return ForbiddenError;
}(Error);

var InternalServerError = exports.InternalServerError = function (_Error3) {
  (0, _inherits3.default)(InternalServerError, _Error3);

  function InternalServerError(msg) {
    var _ret3;

    (0, _classCallCheck3.default)(this, InternalServerError);

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (InternalServerError.__proto__ || (0, _getPrototypeOf2.default)(InternalServerError)).call(this));

    return _ret3 = {
      statusCode: 500,
      msg: "[Internal Server Error]: " + msg
    }, (0, _possibleConstructorReturn3.default)(_this3, _ret3);
  }

  return InternalServerError;
}(Error);

var UnknownError = exports.UnknownError = function (_Error4) {
  (0, _inherits3.default)(UnknownError, _Error4);

  function UnknownError(statusCode, msg) {
    var _ret4;

    (0, _classCallCheck3.default)(this, UnknownError);

    var _this4 = (0, _possibleConstructorReturn3.default)(this, (UnknownError.__proto__ || (0, _getPrototypeOf2.default)(UnknownError)).call(this));

    return _ret4 = {
      statusCode: statusCode,
      msg: "[Unknown Error]: " + msg
    }, (0, _possibleConstructorReturn3.default)(_this4, _ret4);
  }

  return UnknownError;
}(Error);