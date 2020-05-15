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
    musicHome: {},
    hotkeys: [],
    songValue: '',
    page: 1,
    songData: []
  },
  onLoad: function onLoad(options) {
    console.log('Page.onLoad', options);
  },
  onShow: function onShow() {
    this.getData();
  },
  onShareAppMessage: function onShareAppMessage(options) {
    return {
      title: '小哥哥小姐姐都在这听音乐～',
      path: '/pages/musicIndex/index',
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
  getData: function getData() {
    var _this = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.getMusicHomeAsync();

              _this.getHotKeyAsync();

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },
  getMusicHomeAsync: function getMusicHomeAsync() {
    var _this2 = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var res, data, topList;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return (0, _actions.getMusicHome)();

            case 3:
              res = _context2.sent;
              data = res.data || {};
              topList = data.topList || [];


              _this2.setData({
                musicHome: {
                  topList: topList
                }
              });
              _context2.next = 12;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2['catch'](0);

              console.log(_context2.t0);

            case 12:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[0, 9]]);
    }))();
  },
  musicTopList: function musicTopList(event) {
    var id = event.currentTarget.dataset.id;


    (0, _navigateTo2.default)('/pages/musicTopList/index?id=' + id);
  },
  getHotKeyAsync: function getHotKeyAsync() {
    var _this3 = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var res, data, hotkeys, special_key;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return (0, _actions.getHotKey)();

            case 3:
              res = _context3.sent;
              data = res.data || {};
              hotkeys = data.hotkey || [];
              special_key = data.special_key || '';


              if (special_key) {
                hotkeys.unshift({
                  k: special_key,
                  n: 0
                });
              }

              if (hotkeys.length) {
                _this3.setData({
                  hotkeys: hotkeys
                });
              }
              _context3.next = 14;
              break;

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3['catch'](0);

              console.log(_context3.t0);

            case 14:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this3, [[0, 11]]);
    }))();
  },
  songInput: function songInput(event) {
    var value = event.detail.value;


    this.setData({
      songValue: value
    });
  },
  songSearch: function songSearch() {
    var _this4 = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
      var value, res, data;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              value = _this4.data.songValue;

              if (value) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt('return');

            case 3:
              _context4.prev = 3;
              _context4.next = 6;
              return (0, _actions.searchSong)(value, 1);

            case 6:
              res = _context4.sent;
              data = res.data || [];


              if (data.length) {
                _this4.setData({
                  songValue: value,
                  page: 1,
                  songData: data
                });
              } else {
                wx.showToast({
                  title: '无结果',
                  icon: 'none'
                });
              }

              app.aldstat.sendEvent('搜索歌曲', {
                '关键词': value
              });
              _context4.next = 15;
              break;

            case 12:
              _context4.prev = 12;
              _context4.t0 = _context4['catch'](3);

              console.log(_context4.t0);

            case 15:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this4, [[3, 12]]);
    }))();
  },
  keywordSongSearch: function keywordSongSearch(event) {
    var _this5 = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
      var value, res, data;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              value = event.currentTarget.dataset.value;

              if (value) {
                _context5.next = 3;
                break;
              }

              return _context5.abrupt('return');

            case 3:
              _context5.prev = 3;
              _context5.next = 6;
              return (0, _actions.searchSong)(value, 1);

            case 6:
              res = _context5.sent;
              data = res.data || [];


              if (data.length) {
                _this5.setData({
                  songValue: value,
                  page: 1,
                  songData: data
                });
              } else {
                wx.showToast({
                  title: '无结果',
                  icon: 'none'
                });
              }

              app.aldstat.sendEvent('搜索歌曲', {
                '关键词': value
              });
              _context5.next = 15;
              break;

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5['catch'](3);

              console.log(_context5.t0);

            case 15:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this5, [[3, 12]]);
    }))();
  },
  moreSongSearch: function moreSongSearch(event) {
    var _this6 = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
      var value, page, res, data;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              value = _this6.data.songValue;

              if (value) {
                _context6.next = 3;
                break;
              }

              return _context6.abrupt('return');

            case 3:
              _context6.prev = 3;
              page = _this6.data.page + 1;
              _context6.next = 7;
              return (0, _actions.searchSong)(value, page);

            case 7:
              res = _context6.sent;
              data = res.data || [];


              if (data.length) {
                _this6.setData({
                  songValue: value,
                  page: page,
                  songData: _this6.data.songData.concat(data)
                });
              } else {
                wx.showToast({
                  title: '没有了',
                  icon: 'none'
                });
              }
              _context6.next = 15;
              break;

            case 12:
              _context6.prev = 12;
              _context6.t0 = _context6['catch'](3);

              console.log(_context6.t0);

            case 15:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this6, [[3, 12]]);
    }))();
  },
  songSearchCancel: function songSearchCancel() {
    this.setData({
      songValue: '',
      page: 1,
      songData: []
    });
  },
  musicSong: function musicSong(event) {
    var _this7 = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
      var _event$currentTarget$, _event$currentTarget$2, songmid, _event$currentTarget$3, songname, _event$currentTarget$4, albumname, _event$currentTarget$5, singername;

      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _event$currentTarget$ = event.currentTarget.dataset, _event$currentTarget$2 = _event$currentTarget$.songmid, songmid = _event$currentTarget$2 === undefined ? '' : _event$currentTarget$2, _event$currentTarget$3 = _event$currentTarget$.songname, songname = _event$currentTarget$3 === undefined ? '未知歌曲' : _event$currentTarget$3, _event$currentTarget$4 = _event$currentTarget$.albumname, albumname = _event$currentTarget$4 === undefined ? '未知专辑' : _event$currentTarget$4, _event$currentTarget$5 = _event$currentTarget$.singername, singername = _event$currentTarget$5 === undefined ? '未知歌手' : _event$currentTarget$5;

              // navigateTo(`/pages/musicSong/index?songmid=${songmid}&songname=${songname}&albumname=${albumname}&singername=${singername}`)

              wx.showToast({
                title: songname,
                icon: 'none'
              });

            case 2:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, _this7);
    }))();
  }
});