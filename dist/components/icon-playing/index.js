'use strict';

var _computedBehavior = require('./../computedBehavior.js');

var _computedBehavior2 = _interopRequireDefault(_computedBehavior);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Component({
  externalClasses: ['my-class'],
  behaviors: [_computedBehavior2.default],
  options: {},
  // https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/relations.html
  relations: {},
  // 类似 vue 中 props
  properties: {},
  // 类似 vue 中 data
  data: {},
  // 类似 vue 中 computed。计算属性挂在 data 上，当依赖的变量发生 setData 变化时，会重新计算并进行 setData
  computed: {},
  // 类似 vue 中 methods
  methods: {},
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