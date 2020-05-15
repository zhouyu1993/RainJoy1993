'use strict';

var _typeof2 = require('./../npm/babel-runtime/helpers/typeof.js');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('./../npm/babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Behavior({
  lifetimes: {
    created: function created() {
      this._computedCache = {};
      this._originalSetData = this.setData;
      this.setData = this._setData;
      this._doingSetData = false;
    }
  },
  definitionFilter: function definitionFilter(defFields) {
    var computed = defFields.computed || {};
    var computedKeys = (0, _keys2.default)(computed);

    // 计算 computed
    var calcComputed = function calcComputed(scope) {
      var needUpdate = {};
      var computedCache = scope._computedCache || scope.data;

      for (var i = 0, len = computedKeys.length; i < len; i++) {
        var key = computedKeys[i];
        var getter = computed[key];

        if (typeof getter === 'function') {
          var value = getter.call(scope);

          if (computedCache[key] !== value) {
            needUpdate[key] = value;
            computedCache[key] = value;
          }
        }
      }

      return needUpdate;
    };

    // 初始化 computed
    var initComputed = function initComputed() {
      defFields.data = defFields.data || {};

      // 先将 properties 里的字段写入到 data 中
      var data = defFields.data;
      var properties = defFields.properties;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      if (properties) {
        // eslint-disable-next-line complexity
        (0, _keys2.default)(properties).forEach(function (key) {
          var value = properties[key];
          var oldObserver = void 0;

          // eslint-disable-next-line max-len
          if (value === null || value === Number || value === String || value === Boolean || value === Object || value === Array) {
            properties[key] = {
              type: value
            };
          } else if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
            if (hasOwnProperty.call(value, 'value')) {
              // 处理值
              data[key] = value.value;
            }

            if (hasOwnProperty.call(value, 'observer') && typeof value.observer === 'function') {
              oldObserver = value.observer;
            }
          }

          // 追加 observer，用于监听变动
          properties[key].observer = function () {
            var originalSetData = this._originalSetData;

            if (this._doingSetData) {
              // eslint-disable-next-line no-console
              console.warn('can\'t call setData in computed getter function!');
              return;
            }

            this._doingSetData = true;

            // 计算 computed
            var needUpdate = calcComputed(this);

            // 做 computed 属性的 setData
            originalSetData.call(this, needUpdate);

            this._doingSetData = false;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            if (oldObserver) oldObserver.apply(this, args);
          };
        });
      }

      // 计算 computed
      calcComputed(defFields, true);
    };

    initComputed();

    defFields.methods = defFields.methods || {};
    defFields.methods._setData = function (data, callback) {
      var originalSetData = this._originalSetData;

      if (this._doingSetData) {
        // eslint-disable-next-line no-console
        console.warn('can\'t call setData in computed getter function!');
        return;
      }

      this._doingSetData = true;

      // TODO 过滤掉 data 中的 computed 字段
      var dataKeys = (0, _keys2.default)(data);
      for (var i = 0, len = dataKeys.length; i < len; i++) {
        var key = dataKeys[i];

        if (computed[key]) delete data[key];
      }

      // 做 data 属性的 setData
      originalSetData.call(this, data, callback);

      // 计算 computed
      var needUpdate = calcComputed(this);

      // 做 computed 属性的 setData
      originalSetData.call(this, needUpdate);

      this._doingSetData = false;
    };
  }
});