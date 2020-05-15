'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('./../npm/babel-runtime/core-js/object/assign.js');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty = require('./../npm/babel-runtime/core-js/object/define-property.js');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _typeof2 = require('./../npm/babel-runtime/helpers/typeof.js');

var _typeof3 = _interopRequireDefault(_typeof2);

var _promise = require('./../npm/babel-runtime/core-js/promise.js');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require('./../npm/babel-runtime/core-js/json/stringify.js');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('./../npm/babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

exports.default = create;

var _diff = require('./diff.js');

var _diff2 = _interopRequireDefault(_diff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var originData = null; /* eslint-disable */

var globalStore = null;
var fnMapping = {};

var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
var FUNCTIONTYPE = '[object Function]';

function create(store, option) {
  var updatePath = null;
  if (arguments.length === 2) {
    if (option.data && (0, _keys2.default)(option.data).length > 0) {
      updatePath = getUpdatePath(option.data);
      syncValues(store.data, option.data);
    }
    if (!originData) {
      originData = JSON.parse((0, _stringify2.default)(store.data));
      globalStore = store;
      store.instances = {};
      store.update = update;
      store.push = push;
      store.pull = pull;
      store.add = add;
      store.remove = remove;
      store.originData = originData;
      store.env && initCloud(store.env);
      extendStoreMethod(store);
    }
    getApp().globalData && (getApp().globalData.store = store);
    // option.data = store.data
    var onLoad = option.onLoad;
    walk(store.data);
    option.onLoad = function (e) {
      this.store = store;
      this._updatePath = updatePath;
      rewriteUpdate(this);
      store.instances[this.route] = [];
      store.instances[this.route].push(this);
      onLoad && onLoad.call(this, e);
      syncValues(store.data, this.data);
      this.setData(this.data);
    };
    Page(option);
  } else {
    var ready = store.ready;
    var pure = store.pure;
    store.ready = function () {
      if (pure) {
        this.store = { data: store.data || {} };
        this.store.originData = store.data ? JSON.parse((0, _stringify2.default)(store.data)) : {};
        walk(store.data || {});
        rewritePureUpdate(this);
      } else {
        this.page = getCurrentPages()[getCurrentPages().length - 1];
        this.store = this.page.store;
        this._updatePath = getUpdatePath(store.data);
        syncValues(this.store.data, store.data);
        walk(store.data || {});
        this.setData.call(this, this.store.data);
        rewriteUpdate(this);
        this.store.instances[this.page.route].push(this);
      }
      ready && ready.call(this);
    };
    Component(store);
  }
}

function syncValues(from, to) {
  (0, _keys2.default)(to).forEach(function (key) {
    if (from.hasOwnProperty(key)) {
      to[key] = from[key];
    }
  });
}

function getUpdatePath(data) {
  var result = {};
  dataToPath(data, result);
  return result;
}

function dataToPath(data, result) {
  (0, _keys2.default)(data).forEach(function (key) {
    result[key] = true;
    var type = Object.prototype.toString.call(data[key]);
    if (type === OBJECTTYPE) {
      _objToPath(data[key], key, result);
    } else if (type === ARRAYTYPE) {
      _arrayToPath(data[key], key, result);
    }
  });
}

function _objToPath(data, path, result) {
  (0, _keys2.default)(data).forEach(function (key) {
    result[path + '.' + key] = true;
    delete result[path];
    var type = Object.prototype.toString.call(data[key]);
    if (type === OBJECTTYPE) {
      _objToPath(data[key], path + '.' + key, result);
    } else if (type === ARRAYTYPE) {
      _arrayToPath(data[key], path + '.' + key, result);
    }
  });
}

function _arrayToPath(data, path, result) {
  data.forEach(function (item, index) {
    result[path + '[' + index + ']'] = true;
    delete result[path];
    var type = Object.prototype.toString.call(item);
    if (type === OBJECTTYPE) {
      _objToPath(item, path + '[' + index + ']', result);
    } else if (type === ARRAYTYPE) {
      _arrayToPath(item, path + '[' + index + ']', result);
    }
  });
}

function rewritePureUpdate(ctx) {
  ctx.update = function (patch) {
    var store = this.store;
    var that = this;
    return new _promise2.default(function (resolve) {
      // defineFnProp(store.data)
      if (patch) {
        for (var key in patch) {
          updateByPath(store.data, key, patch[key]);
        }
      }
      var diffResult = (0, _diff2.default)(store.data, store.originData);
      var array = [];
      if ((0, _keys2.default)(diffResult)[0] == '') {
        diffResult = diffResult[''];
      }
      if ((0, _keys2.default)(diffResult).length > 0) {
        array.push(new _promise2.default(function (resolve) {
          return that.setData(diffResult);
        }));
        store.onChange && store.onChange(diffResult);
        for (var _key in diffResult) {
          updateByPath(store.originData, _key, (0, _typeof3.default)(diffResult[_key]) === 'object' ? JSON.parse((0, _stringify2.default)(diffResult[_key])) : diffResult[_key]);
        }
      }
      _promise2.default.all(array).then(function (e) {
        return resolve(diffResult);
      });
    });
  };
}

function initCloud(env) {
  wx.cloud.init();
  globalStore.db = wx.cloud.database({
    env: env
  });
}

function push(patch) {
  return new _promise2.default(function (resolve, reject) {
    _push(update(patch), resolve, reject);
  });
}

function _push(diffResult, resolve) {
  var objs = diffToPushObj(diffResult);
  (0, _keys2.default)(objs).forEach(function (path) {
    var arr = path.split('-');
    var id = globalStore.data[arr[0]][parseInt(arr[1])]._id;
    var obj = objs[path];
    if (globalStore.methods && globalStore.methods[arr[0]]) {
      (0, _keys2.default)(globalStore.methods[arr[0]]).forEach(function (key) {
        if (obj.hasOwnProperty(key)) {
          delete obj[key];
        }
      });
    }
    globalStore.db.collection(arr[0]).doc(id).update({
      data: obj
    }).then(function (res) {
      resolve(res);
    });
  });
}

function update(patch) {
  return new _promise2.default(function (resolve) {
    // defineFnProp(globalStore.data)
    if (patch) {
      for (var key in patch) {
        updateByPath(globalStore.data, key, patch[key]);
      }
    }
    var diffResult = (0, _diff2.default)(globalStore.data, originData);
    if ((0, _keys2.default)(diffResult)[0] == '') {
      diffResult = diffResult[''];
    }
    var updateAll = matchGlobalData(diffResult);
    var array = [];
    if ((0, _keys2.default)(diffResult).length > 0) {
      for (var _key2 in globalStore.instances) {
        globalStore.instances[_key2].forEach(function (ins) {
          if (updateAll || globalStore.updateAll || ins._updatePath && needUpdate(diffResult, ins._updatePath)) {
            array.push(new _promise2.default(function (resolve) {
              return ins.setData.call(ins, diffResult);
            }));
          }
        });
      }
      globalStore.onChange && globalStore.onChange(diffResult);
      for (var _key3 in diffResult) {
        updateByPath(originData, _key3, (0, _typeof3.default)(diffResult[_key3]) === 'object' ? JSON.parse((0, _stringify2.default)(diffResult[_key3])) : diffResult[_key3]);
      }
    }
    _promise2.default.all(array).then(function (e) {
      resolve(diffResult);
    });
  });
}

function matchGlobalData(diffResult) {
  if (!globalStore.globalData) return false;
  for (var keyA in diffResult) {
    if (globalStore.globalData.indexOf(keyA) > -1) {
      return true;
    }
    for (var i = 0, len = globalStore.globalData.length; i < len; i++) {
      if (includePath(keyA, globalStore.globalData[i])) {
        return true;
      }
    }
  }
  return false;
}

function needUpdate(diffResult, updatePath) {
  for (var keyA in diffResult) {
    if (updatePath[keyA]) {
      return true;
    }
    for (var keyB in updatePath) {
      if (includePath(keyA, keyB)) {
        return true;
      }
    }
  }
  return false;
}

function includePath(pathA, pathB) {
  if (pathA.indexOf(pathB) === 0) {
    var next = pathA.substr(pathB.length, 1);
    if (next === '[' || next === '.') {
      return true;
    }
  }
  return false;
}

function rewriteUpdate(ctx) {
  ctx.update = update;
}

function updateByPath(origin, path, value) {
  var arr = path.replace(/]/g, '').replace(/\[/g, '.').split('.');
  var current = origin;
  for (var i = 0, len = arr.length; i < len; i++) {
    if (i === len - 1) {
      current[arr[i]] = value;
    } else {
      current = current[arr[i]];
    }
  }
}

function pull(cn, where) {
  return new _promise2.default(function (resolve) {
    globalStore.db.collection(cn).where(where || {}).get().then(function (res) {
      extend(res, cn);
      resolve(res);
    });
  });
}

function extend(res, cn) {
  res.data.forEach(function (item) {
    var mds = globalStore.methods[cn];
    mds && (0, _keys2.default)(mds).forEach(function (key) {
      (0, _defineProperty2.default)(item, key, {
        enumerable: true,
        get: function get() {
          return mds[key].call(item);
        },
        set: function set() {
          // 方法不能改写
        }
      });
    });
  });
}

function add(cn, data) {
  return globalStore.db.collection(cn).add({ data: data });
}

function remove(cn, id) {
  return globalStore.db.collection(cn).doc(id).remove();
}

function diffToPushObj(diffResult) {
  var result = {};
  (0, _keys2.default)(diffResult).forEach(function (key) {
    diffItemToObj(key, diffResult[key], result);
  });
  return result;
}

function diffItemToObj(path, value, result) {
  var arr = path.replace(/]/g, '').replace(/\[/g, '.').split('.');
  var obj = {};
  var current = null;
  var len = arr.length;
  for (var i = 2; i < len; i++) {
    if (len === 3) {
      obj[arr[i]] = value;
    } else {
      if (i === len - 1) {
        current[arr[i]] = value;
      } else {
        var pre = current;
        current = {};
        if (i === 2) {
          obj[arr[i]] = current;
        } else {
          pre[arr[i]] = current;
        }
      }
    }
  }
  var key = arr[0] + '-' + arr[1];
  result[key] = (0, _assign2.default)(result[key] || {}, obj);
}

function extendStoreMethod() {
  globalStore.method = function (path, fn) {
    fnMapping[path] = fn;
    var ok = getObjByPath(path);
    (0, _defineProperty2.default)(ok.obj, ok.key, {
      enumerable: true,
      get: function get() {
        return fnMapping[path].call(globalStore.data);
      },
      set: function set() {
        console.warn('Please using store.method to set method prop of data!');
      }
    });
  };
}

function getObjByPath(path) {
  var arr = path.replace(/]/g, '').replace(/\[/g, '.').split('.');
  var len = arr.length;
  if (len > 1) {
    var current = globalStore.data[arr[0]];
    for (var i = 1; i < len - 1; i++) {
      current = current[arr[i]];
    }
    return { obj: current, key: arr[len - 1] };
  } else {
    return { obj: globalStore.data, key: arr[0] };
  }
}

function walk(data) {
  (0, _keys2.default)(data).forEach(function (key) {
    var obj = data[key];
    var tp = type(obj);
    if (tp == FUNCTIONTYPE) {
      setProp(key, obj);
    } else if (tp == OBJECTTYPE) {
      (0, _keys2.default)(obj).forEach(function (subKey) {
        _walk(obj[subKey], key + '.' + subKey);
      });
    } else if (tp == ARRAYTYPE) {
      obj.forEach(function (item, index) {
        _walk(item, key + '[' + index + ']');
      });
    }
  });
}

function _walk(obj, path) {
  var tp = type(obj);
  if (tp == FUNCTIONTYPE) {
    setProp(path, obj);
  } else if (tp == OBJECTTYPE) {
    (0, _keys2.default)(obj).forEach(function (subKey) {
      _walk(obj[subKey], path + '.' + subKey);
    });
  } else if (tp == ARRAYTYPE) {
    obj.forEach(function (item, index) {
      _walk(item, path + '[' + index + ']');
    });
  }
}

function setProp(path, fn) {
  var ok = getObjByPath(path);
  fnMapping[path] = fn;
  (0, _defineProperty2.default)(ok.obj, ok.key, {
    enumerable: true,
    get: function get() {
      return fnMapping[path].call(globalStore.data);
    },
    set: function set() {
      console.warn('Please using store.method to set method prop of data!');
    }
  });
}

function type(obj) {
  return Object.prototype.toString.call(obj);
}