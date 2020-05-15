'use strict';

Component({
  externalClasses: ['my-class'],
  behaviors: [],
  options: {},
  // https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/relations.html
  relations: {},
  // 类似 vue 中 props
  properties: {
    visible: {
      type: Boolean,
      value: false,
      observer: function observer(newVal, oldVal) {
        // console.log(newVal, oldVal)
      }
    },
    autoHidden: {
      type: Boolean,
      value: true,
      observer: function observer(newVal, oldVal) {
        // console.log(newVal, oldVal)
      }
    },
    title: {
      type: String,
      value: '提示',
      observer: function observer(newVal, oldVal) {
        // console.log(newVal, oldVal)
      }
    },
    content: {
      type: String,
      value: '这是一个模态弹窗',
      observer: function observer(newVal, oldVal) {
        // console.log(newVal, oldVal)
      }
    },
    cancelOpenType: {
      type: String,
      value: '',
      observer: function observer(newVal, oldVal) {
        // console.log(newVal, oldVal)
      }
    },
    cancelColor: {
      type: String,
      value: '#333',
      observer: function observer(newVal, oldVal) {
        // console.log(newVal, oldVal)
      }
    },
    cancelText: {
      type: String,
      value: '取消',
      observer: function observer(newVal, oldVal) {
        // console.log(newVal, oldVal)
      }
    },
    confirmOpenType: {
      type: String,
      value: '',
      observer: function observer(newVal, oldVal) {
        // console.log(newVal, oldVal)
      }
    },
    confirmColor: {
      type: String,
      value: '#ff397e',
      observer: function observer(newVal, oldVal) {
        // console.log(newVal, oldVal)
      }
    },
    confirmText: {
      type: String,
      value: '确定',
      observer: function observer(newVal, oldVal) {
        // console.log(newVal, oldVal)
      }
    },
    lang: {
      type: String,
      value: 'en',
      observer: function observer(newVal, oldVal) {
        // console.log(newVal, oldVal)
      }
    }
  },
  // 类似 vue 中 data
  data: {
    hidden: false
  },
  // 类似 vue 中 methods
  methods: {
    cancel: function cancel() {
      this.triggerEvent('cancel');

      this.autoHiddenModal();
    },
    confirm: function confirm() {
      this.triggerEvent('confirm');

      this.autoHiddenModal();
    },
    getUserInfo: function getUserInfo(res) {
      this.triggerEvent('getUserInfo', res.detail);

      this.autoHiddenModal();
    },
    autoHiddenModal: function autoHiddenModal() {
      if (this.data.autoHidden) {
        this.setData({
          hidden: true
        });
      }
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
});