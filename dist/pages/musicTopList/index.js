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

Page({
  data: {
    id: '',
    musicTopList: {}
  },
  onLoad: function onLoad(options) {
    console.log('Page.onLoad', options);

    var id = options.id;


    this.setData({
      id: id
    });
  },
  onShow: function onShow() {
    this.getData();
  },
  onShareAppMessage: function onShareAppMessage(options) {
    var title = '排行榜';
    if (this.data.musicTopList && this.data.musicTopList.topinfo && this.data.musicTopList.topinfo.ListName) {
      title = this.data.musicTopList.topinfo.ListName + '\u3010\u514D\u8D39\u597D\u542C\u97F3\u4E50\u3011';
    }

    return {
      title: title,
      path: '/pages/musicTopList/index?id=' + this.data.id,
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
      var id, res;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              id = _this.data.id;

              if (id) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return');

            case 3:
              _context.next = 5;
              return (0, _actions.getMusicTopList)(id);

            case 5:
              res = _context.sent;


              _this.setData({
                musicTopList: res
              });

              if (res.topinfo && res.topinfo.ListName) {
                wx.setNavigationBarTitle({
                  title: res.topinfo.ListName
                });
              }

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },
  musicSong: function musicSong(event) {
    var _this2 = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var _event$currentTarget$, _event$currentTarget$2, songmid, _event$currentTarget$3, songname, _event$currentTarget$4, albumname, _event$currentTarget$5, singername;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _event$currentTarget$ = event.currentTarget.dataset, _event$currentTarget$2 = _event$currentTarget$.songmid, songmid = _event$currentTarget$2 === undefined ? '' : _event$currentTarget$2, _event$currentTarget$3 = _event$currentTarget$.songname, songname = _event$currentTarget$3 === undefined ? '未知歌曲' : _event$currentTarget$3, _event$currentTarget$4 = _event$currentTarget$.albumname, albumname = _event$currentTarget$4 === undefined ? '未知专辑' : _event$currentTarget$4, _event$currentTarget$5 = _event$currentTarget$.singername, singername = _event$currentTarget$5 === undefined ? '未知歌手' : _event$currentTarget$5;

              // navigateTo(`/pages/musicSong/index?songmid=${songmid}&songname=${songname}&albumname=${albumname}&singername=${singername}`)

              wx.showToast({
                title: songname,
                icon: 'none'
              });

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }))();
  },
  showInfo: function showInfo(event) {
    var text = event.currentTarget.dataset.text;


    if (text) {
      wx.showToast({
        title: text,
        icon: 'none'
      });
    }
  }
});