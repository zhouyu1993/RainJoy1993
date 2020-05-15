'use strict';

var _api = require('./../../utils/api.js');

// import { appId } from '../../utils/constants'

Component({
  externalClasses: ['my-class'],
  behaviors: [],
  options: {},
  // https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/relations.html
  relations: {},
  // 类似 vue 中 props
  properties: {
    disabled: {
      type: Boolean,
      value: false,
      observer: function observer(newVal, oldVal) {
        // console.log(newVal, oldVal)
      }
    }
  },
  // 类似 vue 中 data
  data: {},
  // 类似 vue 中 methods
  methods: {
    tracker: function tracker(e) {
      if (this.properties.disabled) return;

      var formId = e.detail && e.detail.formId;

      if (formId === 'the formId is a mock one') return console.warn('\u6A21\u62DF\u5668\u64CD\u4F5C\u4E0D\u4E0A\u62A5formid, \u5408\u6CD5request\u91CC\u9700\u8981\u914D\u7F6E ' + _api.WXDATA);

      wx.login({
        success: function success(_ref) {
          var code = _ref.code;

          // const { uid = '', } = wx.getStorageSync('passport') || {}
          // const str = uid ? `${appId}${formId}${code}${uid}hzw365` : `${appId}${formId}${code}hzw365`
          // const sign = md5(str)
          // console.log(str, sign)
          //
          // request({
          //   url: `${WXDATA}/api/v1/appInfo/saveInfo?app_id=${appId}&form_id=${formId}&code=${code}&uid=${uid}&sign=${sign}`,
          //   showLoading: false,
          //   fail: () => {},
          //   isSuccess: () => true,
          //   success: () => {},
          // })

          console.log(formId);
        }
      });
    }
  },
  lifetimes: {
    created: function created() {},
    attached: function attached() {},
    ready: function ready() {},
    moved: function moved() {},
    detached: function detached() {}
  },
  pageLifetimes: {
    show: function show() {},
    hide: function hide() {},
    resize: function resize() {}
  }
}); // import md5 from 'crypto-js/md5'