'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var formatNumber = function formatNumber(input) {
  return input < 10 ? '0' + input : '' + input;
};

var splitTime = function splitTime(date) {
  return {
    'YY': date.getFullYear(),
    'MM': date.getMonth() + 1,
    'DD': date.getDate(),
    'WW': date.getDay(),
    'hh': date.getHours(),
    'mm': date.getMinutes(),
    'ss': date.getSeconds()
  };
};

var formatTime = function formatTime(time) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YY-MM-DD hh:mm:ss';
  var original = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var date = new Date(+time);

  if (+date !== 0 && !+date) return format;

  if (!format || typeof format !== 'string') {
    format = 'YY-MM-DD hh:mm:ss';
  }

  var t = splitTime(date);

  if (original) return t;

  var formatTime = '';
  for (var key in t) {
    formatTime = format.replace(key, formatNumber(t[key]));
    format = formatTime;
  }

  return formatTime;
};

exports.default = formatTime;