'use strict';

var _extends2 = require('./../../npm/babel-runtime/helpers/extends.js');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('./../../npm/babel-runtime/regenerator/index.js');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('./../../npm/babel-runtime/helpers/asyncToGenerator.js');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _md = require('./../../npm/crypto-js/md5.js');

var _md2 = _interopRequireDefault(_md);

var _jsBase = require('./../../npm/js-base64/base64.js');

var _queryString = require('./../../npm/query-string/index.js');

var _queryString2 = _interopRequireDefault(_queryString);

var _actions = require('./../../utils/actions.js');

var _navigateTo = require('./../../utils/navigateTo.js');

var _navigateTo2 = _interopRequireDefault(_navigateTo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Page } from '../../lib/ald/ald-stat'
var Page = require('./../../lib/ald/ald-stat.js').Page;
// Page = require('./../../lib/xiaoshentui/pushsdk.js').pushSdk(Page).Page

var app = getApp();

var plugin = requirePlugin('WechatSI');
var manager = plugin.getRecordRecognitionManager();

Page({
  data: {
    systemInfo: {},
    userInfo: {},
    address: {},
    modal: {},
    speacialValue: ''
  },
  onLoad: function onLoad(options) {
    var _this = this;

    console.log('Page.onLoad', options);

    console.log(_jsBase.Base64);
    console.log(_jsBase.Base64.encode('你好'));
    console.log(_jsBase.Base64.decode('5L2g5aW9'));
    console.log('md5', (0, _md2.default)('123'), '' + (0, _md2.default)('123'));
    console.log(_queryString2.default);
    console.log((0, _queryString.parse)('a=1&b=2'));
    console.log((0, _queryString.stringify)({ a: 1, b: 2 }));

    var _app$globalData = app.globalData,
        systemInfo = _app$globalData.systemInfo,
        userInfo = _app$globalData.userInfo,
        address = _app$globalData.address;


    console.log(systemInfo);

    this.setData({
      systemInfo: systemInfo,
      userInfo: userInfo,
      address: address
    });

    var backgroundAudioManager = wx.getBackgroundAudioManager();

    manager.onStart = function (res) {
      console.log('开始识别', res);

      wx.showToast({
        title: '3秒内请说话',
        icon: 'none'
      });
    };

    manager.onStop = function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(res) {
        var value, _res, lan, text, _res2, data, song, songmid, songname, albumname, singername;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('识别结果', res);

                value = res.result;

                if (value) {
                  _context.next = 6;
                  break;
                }

                wx.showToast({
                  title: '你说啥',
                  icon: 'none'
                });
                _context.next = 51;
                break;

              case 6:
                app.aldstat.sendEvent('小雨同学', {
                  '关键词': value
                });

                _context.prev = 7;
                _context.next = 10;
                return (0, _actions.langDetect)(value);

              case 10:
                _res = _context.sent;
                lan = _res.lan;


                console.log(lan);

                text = '你说啥';


                backgroundAudioManager.title = '小雨同学';

                if (!(lan === 'zh')) {
                  _context.next = 45;
                  break;
                }

                if (!/小(宇|雨|羽|禹)同学/.test(value)) {
                  _context.next = 20;
                  break;
                }

                text = encodeURIComponent('主人我在你说');
                _context.next = 42;
                break;

              case 20:
                if (!/(早|中|晚)(上|午)好/.test(value)) {
                  _context.next = 24;
                  break;
                }

                if (_this.getHour() === 0) {
                  text = encodeURIComponent('夜深了，别玩了，你要乖乖睡觉呦～');
                } else if (_this.getHour() === 1) {
                  text = encodeURIComponent('日上三竿，懒猪起床了吗？');
                } else if (_this.getHour() === 2) {
                  text = encodeURIComponent('现在是中午，要记得按时吃饭呀！');
                } else if (_this.getHour() === 3) {
                  text = encodeURIComponent('现在是下午，困了就来一杯奈雪吧！');
                } else if (_this.getHour() === 4) {
                  text = encodeURIComponent('晚上好，下班回家开车要小心。道路千万条，安全第一条，行车不规范，小雨两行泪。');
                } else if (_this.getHour() === 5) {
                  text = encodeURIComponent('快点洗澡吹头发，我先睡为敬～');
                }
                _context.next = 42;
                break;

              case 24:
                _context.prev = 24;
                _context.next = 27;
                return (0, _actions.searchSong)(value, 1);

              case 27:
                _res2 = _context.sent;
                data = _res2.data || [];

                if (!data.length) {
                  _context.next = 37;
                  break;
                }

                song = data[0];
                songmid = song.id;
                songname = song.name;
                albumname = '未知专辑';
                singername = song.singer;


                (0, _navigateTo2.default)('/pages/musicSong/index?songmid=' + songmid + '&songname=' + songname + '&albumname=' + albumname + '&singername=' + singername);

                return _context.abrupt('return');

              case 37:
                _context.next = 42;
                break;

              case 39:
                _context.prev = 39;
                _context.t0 = _context['catch'](24);

                console.log('searchSong', _context.t0);

              case 42:

                backgroundAudioManager.src = 'https://fanyi.baidu.com/gettts?lan=zh&text=' + text + '&spd=5&source=web';
                _context.next = 46;
                break;

              case 45:
                if (lan === 'en') {
                  text = encodeURIComponent('英语听不懂呢，我正在努力学习中～');

                  backgroundAudioManager.src = 'https://fanyi.baidu.com/gettts?lan=zh&text=' + text + '&spd=5&source=web';
                } else {
                  backgroundAudioManager.src = 'https://fanyi.baidu.com/gettts?lan=zh&text=' + text + '&spd=5&source=web';
                }

              case 46:
                _context.next = 51;
                break;

              case 48:
                _context.prev = 48;
                _context.t1 = _context['catch'](7);

                console.log(_context.t1);

              case 51:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this, [[7, 48], [24, 39]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    manager.onError = function (res) {
      console.log('识别错误', res);

      manager.stop();

      wx.showToast({
        title: '出错了',
        icon: 'none'
      });
    };
  },
  onShow: function onShow() {
    var _this2 = this;

    wx.getSetting({
      success: function success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo
          wx.getUserInfo({
            withCredentials: true,
            lang: _this2.data.systemInfo.language || 'en',
            success: function success(res) {
              var userInfo = res.userInfo;


              if (userInfo) {
                _this2.setData({
                  userInfo: userInfo
                });

                app.globalData.userInfo = userInfo;
              }
            }
          });
        } else {
          _this2.showModal({
            content: '登录',
            confirmOpenType: 'getUserInfo'
          });
        }
      }
    });
  },
  onShareAppMessage: function onShareAppMessage(options) {
    return {
      title: '小工具',
      path: '/pages/tool/index',
      success: function success(res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success'
        });
      },
      fail: function fail(res) {
        wx.showToast({
          title: '取消分享',
          icon: 'none'
        });
      }
    };
  },
  getUserInfo: function getUserInfo(res) {
    var userInfo = res.detail.userInfo;


    if (userInfo) {
      this.setData({
        userInfo: userInfo
      });

      app.globalData.userInfo = userInfo;

      this.hideModal();
    } else {
      wx.getSetting({
        success: function success(res) {
          if (!res.authSetting['scope.userInfo']) {
            wx.showToast({
              title: '未授权无法获取您的信息呦～',
              icon: 'none'
            });
          }
        }
      });
    }
  },
  chooseAddress: function chooseAddress() {
    var _this3 = this;

    wx.chooseAddress({
      success: function success(res) {
        if (res) {
          _this3.setData({
            address: res
          });

          app.globalData.address = res;
        }
      },
      fail: function fail(res) {
        wx.getSetting({
          success: function success(res) {
            if (!res.authSetting['scope.address']) {
              wx.showToast({
                title: '未授权无法获取您的地址呦～',
                icon: 'none'
              });
            }
          }
        });
      }
    });
  },
  clearStorage: function clearStorage() {
    wx.showModal({
      title: '提示',
      content: '清除缓存',
      success: function success(res) {
        if (res.confirm) {
          // 清理本地数据缓存
          try {
            wx.clearStorageSync();
          } catch (e) {
            console.log(e);
          }
        }
      }
    });
  },
  showModal: function showModal() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.setData({
      modal: (0, _extends3.default)({
        visible: true
      }, options)
    });
  },
  hideModal: function hideModal() {
    this.setData({
      modal: {
        visible: false
      }
    });
  },
  modalCancel: function modalCancel() {
    wx.showToast({
      title: '不登录无法获取头像呦～',
      icon: 'none'
    });
  },
  speacialInput: function speacialInput(event) {
    var value = event.detail.value;


    this.setData({
      speacialValue: value
    });
  },
  speacialSearch: function speacialSearch() {
    var value = this.data.speacialValue;

    if (!value) return;

    if (value === '徐蜗牛') {
      (0, _navigateTo2.default)('/pages/musicSong/index?speacial=1');
    } else {
      wx.showToast({
        title: '待开发功能～',
        icon: 'none'
      });
    }
  },
  voiceAssistant: function voiceAssistant() {
    manager.start({
      duration: 3000,
      lang: 'zh_CN'
    });
  },
  getHour: function getHour() {
    var time = new Date();
    var hour = time.getHours();

    if (hour >= 0 & hour < 6) {
      return 0;
    } else if (hour >= 6 & hour < 11) {
      return 1;
    } else if (hour >= 11 & hour < 14) {
      return 2;
    } else if (hour >= 14 & hour < 18) {
      return 3;
    } else if (hour >= 18 & hour < 22) {
      return 4;
    } else if (hour >= 22 & hour < 24) {
      return 5;
    }
  },
  toSearch: function toSearch() {
    (0, _navigateTo2.default)('/pages/search/index');
  }
});