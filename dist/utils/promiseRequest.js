'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('./../npm/babel-runtime/core-js/promise.js');

var _promise2 = _interopRequireDefault(_promise);

var _alert = require('./alert.js');

var _alert2 = _interopRequireDefault(_alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = function request(option) {
  var url = option.url,
      data = option.data,
      _option$header = option.header,
      header = _option$header === undefined ? {
    'content-type': 'application/x-www-form-urlencoded'
  } : _option$header,
      _option$method = option.method,
      method = _option$method === undefined ? 'GET' : _option$method,
      _option$dataType = option.dataType,
      dataType = _option$dataType === undefined ? 'json' : _option$dataType,
      _option$responseType = option.responseType,
      responseType = _option$responseType === undefined ? 'text' : _option$responseType,
      _option$showLoading = option.showLoading,
      showLoading = _option$showLoading === undefined ? true : _option$showLoading,
      _option$fail = option.fail,
      _fail = _option$fail === undefined ? function (res) {
    (0, _alert2.default)('网络异常');
  } : _option$fail,
      _option$complete = option.complete,
      complete = _option$complete === undefined ? function () {} : _option$complete,
      _option$isSuccess = option.isSuccess,
      isSuccess = _option$isSuccess === undefined ? function (data) {
    return false;
  } : _option$isSuccess,
      _option$isNoLogin = option.isNoLogin,
      isNoLogin = _option$isNoLogin === undefined ? function (data) {
    return false;
  } : _option$isNoLogin,
      _option$noLogin = option.noLogin,
      noLogin = _option$noLogin === undefined ? function (data) {
    (0, _alert2.default)(data && (data.message || data.errmsg || data.msg) || '未登录');
  } : _option$noLogin,
      _option$error = option.error,
      error = _option$error === undefined ? function (data) {
    (0, _alert2.default)(data && (data.message || data.errmsg || data.msg) || '接口异常');
  } : _option$error;

  if (typeof _fail !== 'function' || typeof complete !== 'function' || typeof isSuccess !== 'function' || typeof isNoLogin !== 'function' || typeof noLogin !== 'function' || typeof error !== 'function') return (0, _alert2.default)('参数错误');

  return new _promise2.default(function (resolve, reject) {
    if (showLoading) {
      wx.showLoading({ title: '加载中' });
      wx.showNavigationBarLoading();
    }

    wx.request({
      url: url,
      data: data,
      header: header,
      method: method,
      dataType: dataType,
      responseType: responseType,
      success: function success(_ref) {
        var data = _ref.data;

        if (showLoading) {
          wx.hideLoading();
          wx.hideNavigationBarLoading();
        }

        if (isSuccess(data) || data.code === 1001 || data.errno === 0) {
          resolve(data);
        } else {
          reject(data);
        }
      },
      fail: function fail(res) {
        if (showLoading) {
          wx.hideLoading();
          wx.hideNavigationBarLoading();
        }

        _fail(res);

        reject(res);
      },
      complete: complete
    });
  }).catch(function (data) {
    if (isNoLogin(data) || data.code === 1024 || data.errno === 3520) {
      noLogin(data);
    } else {
      throw data;
    }
  });
};

exports.default = request;