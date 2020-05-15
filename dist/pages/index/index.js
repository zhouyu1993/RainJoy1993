'use strict';

var _regenerator = require('./../../npm/babel-runtime/regenerator/index.js');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('./../../npm/babel-runtime/helpers/asyncToGenerator.js');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actions = require('./../../utils/actions.js');

var _navigateTo = require('./../../utils/navigateTo.js');

var _navigateTo2 = _interopRequireDefault(_navigateTo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Page } from '../../lib/ald/ald-stat'
var Page = require('./../../lib/ald/ald-stat.js').Page;
// Page = require('./../../lib/xiaoshentui/pushsdk.js').pushSdk(Page).Page

var app = getApp();

Page({
  data: {
    gepuValue: '',
    jitaHome: {}
  },
  onLoad: function onLoad(options) {
    console.log('Page.onLoad', options);

    this.getJitaHomeAsync();
  },
  onShow: function onShow() {},
  onShareAppMessage: function onShareAppMessage(options) {
    return {
      title: '吉他曲谱免费搜索',
      path: '/pages/index/index',
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
  getJitaHomeAsync: function getJitaHomeAsync() {
    var _this = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var res, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _actions.getJitaHome)();

            case 2:
              res = _context.sent;
              data = res.data || {};


              data.singer.unshift({
                face: 'http://pu.jitami.96sn.com/singer/20150205165852_7345.jpg',
                id: 10,
                name: '林俊杰'
              });

              data.singer.unshift({
                face: 'http://pu.jitami.96sn.com/singer/20150302100911_6698.jpg',
                id: 118,
                name: '曾轶可'
              });

              _this.setData({
                jitaHome: data
              });

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },
  gepuInput: function gepuInput(event) {
    var value = event.detail.value;


    this.setData({
      gepuValue: value
    });
  },
  gepuSearch: function gepuSearch() {
    var _this2 = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var value, res, data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              value = _this2.data.gepuValue;

              if (value) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt('return');

            case 3:
              _context2.prev = 3;
              _context2.next = 6;
              return (0, _actions.searchJita)(value);

            case 6:
              res = _context2.sent;
              data = res.data || {};


              _this2.setData({
                jitaData: data
              });

              app.aldstat.sendEvent('搜索歌谱', {
                '关键词': value
              });
              _context2.next = 15;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2['catch'](3);

              console.log(_context2.t0);

            case 15:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[3, 12]]);
    }))();
  },
  gepuSearchCancel: function gepuSearchCancel() {
    this.setData({
      gepuValue: '',
      jitaData: {}
    });
  },
  toJitaSinger: function toJitaSinger(event) {
    var id = event.currentTarget.dataset.id;


    (0, _navigateTo2.default)('/pages/jitaSinger/index?id=' + id);
  },
  toJitaSong: function toJitaSong(event) {
    var id = event.currentTarget.dataset.id;


    (0, _navigateTo2.default)('/pages/jitaSong/index?id=' + id);
  }
});