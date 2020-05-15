'use strict';

var _store = require('./../../store/index.js');

var _store2 = _interopRequireDefault(_store);

var _create = require('./../../utils/create.js');

var _create2 = _interopRequireDefault(_create);

var _navigateTo = require('./../../utils/navigateTo.js');

var _navigateTo2 = _interopRequireDefault(_navigateTo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _create2.default)(_store2.default, {
  data: {
    pageA: {},
    pageB: {}
  },
  onLoad: function onLoad(options) {},
  onShow: function onShow() {
    console.log(this);
  },
  onShareAppMessage: function onShareAppMessage(options) {
    return {
      title: 'a',
      path: '/pages/a/index',
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
  decrease: function decrease() {
    this.store.decrease(2);

    this.update();

    (0, _navigateTo2.default)({
      url: '/pages/b/index'
    });
  }
});