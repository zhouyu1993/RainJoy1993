'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('./../npm/babel-runtime/helpers/typeof.js');

var _typeof3 = _interopRequireDefault(_typeof2);

var _alert = require('./alert.js');

var _alert2 = _interopRequireDefault(_alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var flag = false;

var navigateTo = function navigateTo(option) {
  if (flag) return;
  flag = true;

  if (typeof option === 'string') {
    option = {
      url: option
    };
  } else if ((typeof option === 'undefined' ? 'undefined' : (0, _typeof3.default)(option)) !== 'object') {
    flag = false;
    (0, _alert2.default)('参数错误');

    return;
  }

  var _option = option,
      url = _option.url,
      _option$success = _option.success,
      _success = _option$success === undefined ? function (res) {} : _option$success,
      _option$fail = _option.fail,
      _fail = _option$fail === undefined ? function (res) {
    console.log(res);

    (0, _alert2.default)('系统异常');
  } : _option$fail,
      _option$reLaunchUrl = _option.reLaunchUrl,
      reLaunchUrl = _option$reLaunchUrl === undefined ? '/pages/index/index' : _option$reLaunchUrl;

  if (typeof _success !== 'function' || typeof _fail !== 'function') {
    flag = false;
    (0, _alert2.default)('参数错误');

    return;
  }

  wx.navigateTo({
    url: url,
    success: function success(res) {
      _success(res);

      setTimeout(function () {
        flag = false;
      }, 300);
    },
    fail: function fail(res) {
      console.log(res);
      if (reLaunchUrl) {
        wx.reLaunch({
          url: reLaunchUrl
        });
      } else {
        _fail(res);
      }

      setTimeout(function () {
        flag = false;
      }, 300);
    }
  });
};

exports.default = navigateTo;