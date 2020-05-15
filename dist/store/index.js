'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _a = require('./a.js');

var _a2 = _interopRequireDefault(_a);

var _b = require('./b.js');

var _b2 = _interopRequireDefault(_b);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: {
    commonA: 'a',
    commonB: 'b',
    pageA: _a2.default.data,
    pageB: _b2.default.data
  },
  increase: function increase(num) {
    _a2.default.aMethod(num);
  },
  decrease: function decrease(num) {
    _b2.default.bMethod(num);
  }
};