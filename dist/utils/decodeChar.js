'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fromCodePoint = require('./../npm/babel-runtime/core-js/string/from-code-point.js');

var _fromCodePoint2 = _interopRequireDefault(_fromCodePoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var decodeChar = function decodeChar(input) {
  if (!input || typeof input !== 'string') return input;

  var output = input.replace(/&#{1}[0-9]{1,};{1}/ig, function (v) {
    var code = v.replace(/&#(.*);/, '$1');
    return (0, _fromCodePoint2.default)(code);
  });

  return output;
};

exports.default = decodeChar;