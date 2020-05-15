'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var fixNumber = function fixNumber(input) {
  var multiple = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  var decimal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

  input = +input;
  multiple = +multiple || 100;

  return (input / multiple).toFixed(decimal).replace(/\.?0*$/, '');
};

exports.default = fixNumber;