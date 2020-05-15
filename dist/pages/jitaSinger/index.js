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
    jitaSinger: {}
  },
  onLoad: function onLoad(options) {
    console.log('Page.onLoad', options);

    var id = options.id;


    if (id) {
      this.setData({
        id: id
      });

      this.getJitaSingerAsync();
    }
  },
  onShow: function onShow() {},
  onShareAppMessage: function onShareAppMessage(options) {
    var title = '吉他曲谱免费放送';

    if (this.data.jitaSinger.singer_name) {
      title = this.data.jitaSinger.singer_name + '\u7684\u5409\u4ED6\u66F2\u8C31\u514D\u8D39\u653E\u9001';
    }

    return {
      title: title,
      path: '/pages/jitaSinger/index?id=' + this.data.id,
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
  getJitaSingerAsync: function getJitaSingerAsync() {
    var _this = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var id, res, jitaSinger;
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
              return (0, _actions.getJitaSinger)(id);

            case 5:
              res = _context.sent;
              jitaSinger = res.data || {};


              _this.setData({
                jitaSinger: jitaSinger
              });

              if (jitaSinger.singer_name) {
                wx.setNavigationBarTitle({
                  title: jitaSinger.singer_name
                });
              }

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },
  toJitaSong: function toJitaSong(event) {
    var id = event.currentTarget.dataset.id;


    (0, _navigateTo2.default)('/pages/jitaSong/index?id=' + id);
  }
});