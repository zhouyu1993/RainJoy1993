'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.langDetect = exports.getSongIrc = exports.searchSong = exports.getRainJoy1993Config = exports.getMusicTopList = exports.getMusicHome = exports.searchJita = exports.getJitaSong = exports.getJitaSinger = exports.getJitaHome = exports.getHotKey = undefined;

var _regenerator = require('./../npm/babel-runtime/regenerator/index.js');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('./../npm/babel-runtime/helpers/asyncToGenerator.js');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _api = require('./api.js');

var _promiseRequest = require('./promiseRequest.js');

var _promiseRequest2 = _interopRequireDefault(_promiseRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import md5 from 'crypto-js/md5'

var getHotKey = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var res;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _promiseRequest2.default)({
              url: _api.CYQQ + '/splcloud/fcgi-bin/gethotkey.fcg?format=json',
              showLoading: false,
              fail: function fail() {},
              isSuccess: function isSuccess(res) {
                return res.code === 0;
              }
            });

          case 3:
            res = _context.sent;
            return _context.abrupt('return', res);

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);
            throw _context.t0;

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function getHotKey() {
    return _ref.apply(this, arguments);
  };
}();

var getJitaHome = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var res;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _promiseRequest2.default)({
              url: _api.JITA + '/api/home/index',
              showLoading: true,
              fail: function fail() {},
              isSuccess: function isSuccess(res) {
                return res.code === 1;
              }
            });

          case 3:
            res = _context2.sent;
            return _context2.abrupt('return', res);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);
            throw _context2.t0;

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function getJitaHome() {
    return _ref2.apply(this, arguments);
  };
}();

var getJitaSinger = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(id) {
    var res;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _promiseRequest2.default)({
              url: _api.JITA + '/api/home/index/singer_detail?id=' + id,
              showLoading: true,
              fail: function fail() {},
              isSuccess: function isSuccess(res) {
                return res.code === 1;
              }
            });

          case 3:
            res = _context3.sent;
            return _context3.abrupt('return', res);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3['catch'](0);
            throw _context3.t0;

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 7]]);
  }));

  return function getJitaSinger(_x) {
    return _ref3.apply(this, arguments);
  };
}();

var getJitaSong = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(id) {
    var res;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _promiseRequest2.default)({
              url: _api.JITA + '/api/home/index/pu?id=' + id,
              showLoading: true,
              fail: function fail() {},
              isSuccess: function isSuccess(res) {
                return res.code === 1;
              }
            });

          case 3:
            res = _context4.sent;
            return _context4.abrupt('return', res);

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4['catch'](0);
            throw _context4.t0;

          case 10:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 7]]);
  }));

  return function getJitaSong(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

var searchJita = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(key) {
    var res;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return (0, _promiseRequest2.default)({
              url: _api.JITA + '/api/home/index/search?key=' + key,
              showLoading: true,
              fail: function fail() {},
              isSuccess: function isSuccess(res) {
                return res.code === 1;
              }
            });

          case 3:
            res = _context5.sent;
            return _context5.abrupt('return', res);

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5['catch'](0);
            throw _context5.t0;

          case 10:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 7]]);
  }));

  return function searchJita(_x3) {
    return _ref5.apply(this, arguments);
  };
}();

var getMusicHome = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
    var res;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return (0, _promiseRequest2.default)({
              url: _api.CYQQ + '/v8/fcg-bin/fcg_myqq_topList.fcg?format=json',
              showLoading: true,
              fail: function fail() {},
              isSuccess: function isSuccess(res) {
                return res.code === 0;
              }
            });

          case 3:
            res = _context6.sent;
            return _context6.abrupt('return', res);

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6['catch'](0);
            throw _context6.t0;

          case 10:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 7]]);
  }));

  return function getMusicHome() {
    return _ref6.apply(this, arguments);
  };
}();

var getMusicTopList = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(id) {
    var res;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return (0, _promiseRequest2.default)({
              url: _api.CYQQ + '/v8/fcg-bin/fcg_v8_toplist_cp.fcg?topid=' + id + '&format=json',
              showLoading: true,
              fail: function fail() {},
              isSuccess: function isSuccess(res) {
                return res.code === 0;
              }
            });

          case 3:
            res = _context7.sent;
            return _context7.abrupt('return', res);

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7['catch'](0);
            throw _context7.t0;

          case 10:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 7]]);
  }));

  return function getMusicTopList(_x4) {
    return _ref7.apply(this, arguments);
  };
}();

var getRainJoy1993Config = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
    var res;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return (0, _promiseRequest2.default)({
              url: _api.GITLAB + '/zhouyu1993/wx-miniprogram-config/raw/master/RainJoy1993/config.json',
              showLoading: false,
              fail: function fail() {},
              isSuccess: function isSuccess(res) {
                return res.code === 0;
              }
            });

          case 3:
            res = _context8.sent;
            return _context8.abrupt('return', res);

          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8['catch'](0);
            throw _context8.t0;

          case 10:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[0, 7]]);
  }));

  return function getRainJoy1993Config() {
    return _ref8.apply(this, arguments);
  };
}();

var searchSong = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(key) {
    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var res;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return (0, _promiseRequest2.default)({
              url: _api.BZQLL + '/music/tencent/search?key=579621905&s=' + key + '&limit=10&offset=' + page + '&type=song',
              showLoading: true,
              fail: function fail() {},
              isSuccess: function isSuccess(res) {
                return res.code === 200;
              }
            });

          case 3:
            res = _context9.sent;
            return _context9.abrupt('return', res);

          case 7:
            _context9.prev = 7;
            _context9.t0 = _context9['catch'](0);
            throw _context9.t0;

          case 10:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[0, 7]]);
  }));

  return function searchSong(_x5) {
    return _ref9.apply(this, arguments);
  };
}();

var getSongIrc = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(mid) {
    var res;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return (0, _promiseRequest2.default)({
              url: _api.BZQLL + '/music/tencent/lrc?id=' + mid + '&key=579621905',
              showLoading: true,
              fail: function fail() {},
              isSuccess: function isSuccess(res) {
                return true;
              }
            });

          case 3:
            res = _context10.sent;
            return _context10.abrupt('return', res);

          case 7:
            _context10.prev = 7;
            _context10.t0 = _context10['catch'](0);
            throw _context10.t0;

          case 10:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined, [[0, 7]]);
  }));

  return function getSongIrc(_x7) {
    return _ref10.apply(this, arguments);
  };
}();

var langDetect = function () {
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(value) {
    var res;
    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return (0, _promiseRequest2.default)({
              url: _api.FANYI + '/langdetect',
              data: {
                query: value
              },
              method: 'POST',
              showLoading: false,
              fail: function fail() {},
              isSuccess: function isSuccess(res) {
                return res.error === 0;
              }
            });

          case 2:
            res = _context11.sent;
            return _context11.abrupt('return', res);

          case 4:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  }));

  return function langDetect(_x8) {
    return _ref11.apply(this, arguments);
  };
}();

exports.getHotKey = getHotKey;
exports.getJitaHome = getJitaHome;
exports.getJitaSinger = getJitaSinger;
exports.getJitaSong = getJitaSong;
exports.searchJita = searchJita;
exports.getMusicHome = getMusicHome;
exports.getMusicTopList = getMusicTopList;
exports.getRainJoy1993Config = getRainJoy1993Config;
exports.searchSong = searchSong;
exports.getSongIrc = getSongIrc;
exports.langDetect = langDetect;
exports.default = {
  getHotKey: getHotKey,
  getJitaHome: getJitaHome,
  getJitaSinger: getJitaSinger,
  getJitaSong: getJitaSong,
  searchJita: searchJita,
  getMusicHome: getMusicHome,
  getMusicTopList: getMusicTopList,
  getRainJoy1993Config: getRainJoy1993Config,
  searchSong: searchSong,
  getSongIrc: getSongIrc,
  langDetect: langDetect
};