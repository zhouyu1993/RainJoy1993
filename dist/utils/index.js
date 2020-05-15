'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.request = exports.navigateTo = undefined;

var _navigateTo = require('./navigateTo.js');

var _navigateTo2 = _interopRequireDefault(_navigateTo);

var _request = require('./request.js');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.navigateTo = _navigateTo2.default;
exports.request = _request2.default;
exports.default = {
  navigateTo: _navigateTo2.default,
  request: _request2.default
};