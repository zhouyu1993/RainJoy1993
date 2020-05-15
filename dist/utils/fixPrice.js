'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fixNumber = require('./fixNumber.js');

var _fixNumber2 = _interopRequireDefault(_fixNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fixPrice = function fixPrice(input) {
  var multiple = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  var decimal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
  var unit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '元';
  var defaultDescribe = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '0';

  input = +input;

  return input ? '' + (0, _fixNumber2.default)(input, multiple, decimal) + unit : defaultDescribe;
};

exports.default = fixPrice;