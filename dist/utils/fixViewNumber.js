'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var fixViewNumber = function fixViewNumber(input) {
  var multiple = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10000;
  var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '万';

  input = +input;

  return input < 10000 ? '' + input : '' + Math.floor(input / multiple * 100) / 100 + unit;
};

exports.default = fixViewNumber;