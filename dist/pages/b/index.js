'use strict';

var _store = require('./../../store/index.js');

var _store2 = _interopRequireDefault(_store);

var _create = require('./../../utils/create.js');

var _create2 = _interopRequireDefault(_create);

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
      title: 'b',
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
  increase: function increase() {
    this.store.increase(2);

    this.update();

    wx.navigateBack();
  }
});