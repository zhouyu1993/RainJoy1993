'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('./../npm/babel-runtime/helpers/typeof.js');

var _typeof3 = _interopRequireDefault(_typeof2);

var _alert = require('./alert.js');

var _alert2 = _interopRequireDefault(_alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = function request(option) {
  if (typeof option === 'string') {
    option = {
      url: option
    };
  } else if ((typeof option === 'undefined' ? 'undefined' : (0, _typeof3.default)(option)) !== 'object') {
    (0, _alert2.default)('参数错误');

    return;
  }

  var _option = option,
      url = _option.url,
      data = _option.data,
      _option$header = _option.header,
      header = _option$header === undefined ? {
    'content-type': 'application/x-www-form-urlencoded'
  } : _option$header,
      _option$method = _option.method,
      method = _option$method === undefined ? 'GET' : _option$method,
      _option$dataType = _option.dataType,
      dataType = _option$dataType === undefined ? 'json' : _option$dataType,
      _option$responseType = _option.responseType,
      responseType = _option$responseType === undefined ? 'text' : _option$responseType,
      _option$showLoading = _option.showLoading,
      showLoading = _option$showLoading === undefined ? true : _option$showLoading,
      _option$fail = _option.fail,
      _fail = _option$fail === undefined ? function (res) {
    console.log(res);

    (0, _alert2.default)('网络异常');
  } : _option$fail,
      _option$complete = _option.complete,
      complete = _option$complete === undefined ? function () {} : _option$complete,
      _option$isSuccess = _option.isSuccess,
      isSuccess = _option$isSuccess === undefined ? function (data) {
    return false;
  } : _option$isSuccess,
      _option$success = _option.success,
      _success = _option$success === undefined ? function (data) {} : _option$success,
      _option$isNoLogin = _option.isNoLogin,
      isNoLogin = _option$isNoLogin === undefined ? function (data) {
    return false;
  } : _option$isNoLogin,
      _option$noLogin = _option.noLogin,
      noLogin = _option$noLogin === undefined ? function (data) {
    (0, _alert2.default)(data && (data.message || data.errmsg || data.msg) || '未登录');
  } : _option$noLogin,
      _option$error = _option.error,
      error = _option$error === undefined ? function (data) {
    (0, _alert2.default)(data && (data.message || data.errmsg || data.msg) || '接口异常');
  } : _option$error;

  if (typeof _fail !== 'function' || typeof complete !== 'function' || typeof isSuccess !== 'function' || typeof _success !== 'function' || typeof isNoLogin !== 'function' || typeof noLogin !== 'function' || typeof error !== 'function') {
    (0, _alert2.default)('参数错误');

    return;
  }

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
        _success(data);
      } else if (isNoLogin(data) || data.code === 1024 || data.errno === 3520) {
        noLogin(data);
      } else {
        error(data);
      }
    },
    fail: function fail(res) {
      if (showLoading) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
      }

      _fail(res);
    },
    complete: complete
  });
};

exports.default = request;