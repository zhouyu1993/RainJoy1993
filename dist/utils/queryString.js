'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var parse = function parse(string) {
  if (!string || typeof string !== 'string') return {};

  var config = {};

  var arr = string.split('&');
  arr.forEach(function (item) {
    var _arr = item.split('=');
    if (_arr.length === 2) {
      config[_arr[0]] = decodeURIComponent(_arr[1]);
    }
  });

  return config;
};

exports.parse = parse;
exports.default = {
  parse: parse
};