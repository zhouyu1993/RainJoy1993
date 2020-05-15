'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var appId = 'wx8d1d9b1abb35ca02';
var appSecret = '59cf75d7f05d41167ac3ddff2733d88c';

var version = '1.0.6';

if (wx.setStorageSync) {
  wx.setStorageSync('appConfig', {
    appId: appId,
    version: version
  });
}

exports.appId = appId;
exports.appSecret = appSecret;
exports.version = version;