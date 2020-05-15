'use strict';

var _queryString = require('./npm/query-string/index.js');

var _queryString2 = _interopRequireDefault(_queryString);

var _constants = require('./utils/constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { App } from './lib/ald/ald-stat'
var App = require('./lib/ald/ald-stat.js').App;
// App = require('./lib/xiaoshentui/pushsdk.js').pushSdk(App, 'App').App

// 启动时间
var startTime = Date.now();

App({
  globalData: {
    path: '',
    query: {},
    referrerInfo: {},
    scene: '',
    shareTicket: '',
    systemInfo: {},
    userInfo: {},
    address: {},
    passport: {}
  },
  onLaunch: function onLaunch(options) {
    try {
      if (wx.getSystemInfoSync) {
        var systemInfo = wx.getSystemInfoSync() || {};

        this.globalData.systemInfo = systemInfo;
      }

      if (wx.setStorageSync) {
        wx.setStorageSync('appConfig', {
          appId: _constants.appId,
          version: _constants.version
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
  onShow: function onShow(options) {
    try {
      //  wx.getLaunchOptionsSync 基础库 2.1.2 开始支持
      var _ref = options || {},
          path = _ref.path,
          _ref$query = _ref.query,
          query = _ref$query === undefined ? {} : _ref$query,
          _ref$referrerInfo = _ref.referrerInfo,
          referrerInfo = _ref$referrerInfo === undefined ? {} : _ref$referrerInfo,
          scene = _ref.scene,
          shareTicket = _ref.shareTicket;

      this.globalData.path = path || '';
      this.globalData.query = query || {};
      this.globalData.referrerInfo = referrerInfo || {};
      this.globalData.scene = scene || '';
      this.globalData.shareTicket = shareTicket || '';

      // 获取传入的登录态

      var _ref2 = referrerInfo && referrerInfo.extraData || {},
          uid = _ref2.uid,
          skey = _ref2.skey;

      if (uid && skey) {
        this.globalData.passport = {
          uid: uid,
          skey: skey
        };

        wx.setStorageSync('passport', {
          uid: uid,
          skey: skey
        });
      } else {
        // 获取 storage 中的登录态
        var passport = wx.getStorageSync('passport') || {};

        this.globalData.passport = passport;
      }

      var queryScene = query.scene || '';
      if ([1011, 1012, 1013].indexOf(+scene) > -1 && queryScene) {
        // 1011 扫描二维码；1012 长按图片识别二维码；1013 手机相册选取二维码 并且携带参数
        // 1047 扫描小程序码；1048 长按图片识别小程序码；1049 手机相册选取小程序码 并且携带参数
        var _query = _queryString2.default.parse(decodeURIComponent(queryScene));

        this.globalData.query = _query || {};
      }

      this.getUpdateManager();

      if (this.globalData.query.debug) {
        this.setEnableDebug();
      }

      console.log('App.onShow[' + _constants.version + ']', options, this.globalData);
    } catch (e) {
      console.log(e);
    }

    // 记录小程序启动时长
    this.aldstat.sendEvent('小程序的启动时长', {
      time: Date.now() - startTime
    });
  },
  onHide: function onHide() {
    console.log('App.onHide');
  },
  onError: function onError(error) {
    console.log('App.onError', error);
  },
  onPageNotFound: function onPageNotFound(options) {
    console.log('App.onPageNotFound', options);

    wx.switchTab({
      url: '/pages/index/index'
    });
  },
  getUpdateManager: function getUpdateManager() {
    try {
      // https://developers.weixin.qq.com/miniprogram/dev/api/getUpdateManager.html
      if (wx.getUpdateManager) {
        var updateManager = wx.getUpdateManager();

        updateManager.onCheckForUpdate(function (res) {
          // 请求完新版本的信息回调
          if (res.hasUpdate) {
            console.log('onCheckForUpdate:', res);
          }
        });

        updateManager.onUpdateReady(function () {
          // 新版本下载成功
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: function success(res) {
              if (res.confirm) {
                // 清理本地数据缓存
                try {
                  wx.clearStorageSync();
                } catch (e) {
                  console.log(e);
                }

                // 调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate();
              }
            }
          });
        });

        updateManager.onUpdateFailed(function (res) {
          // 新版本下载失败
          console.log('onUpdateFailed:', res);
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
  setEnableDebug: function setEnableDebug() {
    try {
      // https://developers.weixin.qq.com/miniprogram/dev/api/setEnableDebug.html
      if (wx.setEnableDebug) {
        wx.setEnableDebug({
          enableDebug: true
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
});