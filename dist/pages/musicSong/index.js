'use strict';

var _regenerator = require('./../../npm/babel-runtime/regenerator/index.js');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('./../../npm/babel-runtime/helpers/asyncToGenerator.js');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actions = require('./../../utils/actions.js');

var _decodeChar = require('./../../utils/decodeChar.js');

var _decodeChar2 = _interopRequireDefault(_decodeChar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Page } from '../../lib/ald/ald-stat'
var Page = require('./../../lib/ald/ald-stat.js').Page;
// Page = require('./../../lib/xiaoshentui/pushsdk.js').pushSdk(Page).Page

var app = getApp();

Page({
  data: {
    songmid: '',
    songname: '',
    albumname: '',
    singername: '',
    coverImgUrl: '',
    songSrc: '',
    speacial: 0,
    songIrc: ''
  },
  onLoad: function onLoad(options) {
    console.log('Page.onLoad', options);

    var _options$songmid = options.songmid,
        songmid = _options$songmid === undefined ? '' : _options$songmid,
        _options$songname = options.songname,
        songname = _options$songname === undefined ? '' : _options$songname,
        _options$albumname = options.albumname,
        albumname = _options$albumname === undefined ? '' : _options$albumname,
        _options$singername = options.singername,
        singername = _options$singername === undefined ? '' : _options$singername,
        _options$speacial = options.speacial,
        speacial = _options$speacial === undefined ? 0 : _options$speacial;


    if (speacial) {
      this.setData({
        songmid: '003cc8Du2fxoIV',
        songname: 'Sunshine Girl',
        albumname: '我好宣你',
        singername: '徐蜗牛',
        coverImgUrl: 'http://cmspic-10004025.image.myqcloud.com/0b23e778-b411-4f92-9bfe-0390e7e8609a',
        songSrc: 'https://api.bzqll.com/music/tencent/url?id=003cc8Du2fxoIV&key=579621905',
        speacial: speacial
      });

      app.aldstat.sendEvent('播放歌曲', {
        '关键词': '徐蜗牛'
      });

      wx.setNavigationBarTitle({
        title: 'Sunshine Girl'
      });
    } else {
      this.setData({
        songmid: songmid,
        songname: (0, _decodeChar2.default)(songname),
        albumname: (0, _decodeChar2.default)(albumname),
        singername: (0, _decodeChar2.default)(singername),
        coverImgUrl: 'https://api.bzqll.com/music/tencent/pic?id=' + songmid + '&key=579621905',
        songSrc: 'https://api.bzqll.com/music/tencent/url?id=' + songmid + '&key=579621905&br=48'
      });

      app.aldstat.sendEvent('播放歌曲', {
        '关键词': (0, _decodeChar2.default)(songname) + '-' + (0, _decodeChar2.default)(singername)
      });

      wx.setNavigationBarTitle({
        title: (0, _decodeChar2.default)(songname) + '-' + (0, _decodeChar2.default)(singername)
      });
    }
  },
  onShow: function onShow() {
    var _this = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var canplay, res, _data, songmid, songname, albumname, singername, coverImgUrl, songSrc, src, backgroundAudioManager;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              canplay = false;
              _context.prev = 1;
              _context.next = 4;
              return (0, _actions.getRainJoy1993Config)();

            case 4:
              res = _context.sent;


              canplay = res && res.data && res.data.canplay;
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](1);

              console.log(_context.t0);

            case 11:
              if (canplay) {
                _context.next = 13;
                break;
              }

              return _context.abrupt('return');

            case 13:
              _data = _this.data, songmid = _data.songmid, songname = _data.songname, albumname = _data.albumname, singername = _data.singername, coverImgUrl = _data.coverImgUrl, songSrc = _data.songSrc;


              if (songmid) {
                _this.getSongIrc(songmid);

                src = 'https://api.bzqll.com/music/tencent/url?id=' + songmid + '&key=579621905';
                backgroundAudioManager = wx.getBackgroundAudioManager();


                if (backgroundAudioManager.src !== src) {
                  backgroundAudioManager.title = songname || '未知歌曲';
                  backgroundAudioManager.epname = albumname || '未知专辑';
                  backgroundAudioManager.singer = singername || '未知歌手';
                  backgroundAudioManager.coverImgUrl = coverImgUrl || 'https://api.bzqll.com/music/tencent/pic?id=' + songmid + '&key=579621905';
                  backgroundAudioManager.src = songSrc || src;
                }

                backgroundAudioManager.onEnded(function () {
                  wx.showModal({
                    title: '提示',
                    content: '重新播放？',
                    success: function success(res) {
                      if (res.confirm) {
                        backgroundAudioManager.title = songname || '未知歌曲';
                        backgroundAudioManager.epname = albumname || '未知专辑';
                        backgroundAudioManager.singer = singername || '未知歌手';
                        backgroundAudioManager.coverImgUrl = coverImgUrl || 'https://api.bzqll.com/music/tencent/pic?id=' + songmid + '&key=579621905';
                        backgroundAudioManager.src = songSrc || src;
                      }
                    }
                  });
                });

                backgroundAudioManager.onError(function (e) {
                  console.log(e);

                  wx.showToast({
                    title: '版权问题',
                    icon: 'none'
                  });

                  backgroundAudioManager.src = 'https://aliuwmp3.changba.com/userdata/video/1062603340.mp4';
                });

                if (backgroundAudioManager.paused) {
                  backgroundAudioManager.play();
                }
              }

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[1, 8]]);
    }))();
  },

  // onShareAppMessage (options) {
  //   const { songmid, songname, albumname, singername, speacial, } = this.data
  //
  //   let title = '听歌'
  //   let path = '/pages/index/index'
  //   if (speacial) {
  //     title = '告白气球'
  //     path = '/pages/musicSong/index?speacial=1'
  //   } else if (songmid && songname && albumname && singername) {
  //     title = songname
  //     path = `/pages/musicSong/index?songmid=${songmid}&songname=${songname}&albumname=${albumname}&singername=${singername}`
  //   }
  //
  //   return {
  //     title,
  //     path,
  //     success: res => {
  //       wx.showToast({
  //         title: '分享成功',
  //         icon: 'success',
  //       })
  //     },
  //     fail: res => {
  //       wx.showToast({
  //         title: '取消分享',
  //         icon: 'none',
  //       })
  //     },
  //   }
  // },
  getSongIrc: function getSongIrc(songmid) {
    var _this2 = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var res, songIrc;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _actions.getSongIrc)(songmid);

            case 2:
              res = _context2.sent;


              if (typeof res === 'string') {
                songIrc = res.replace(/\[.*?\]/g, '').replace(/&apos;/g, "'");


                _this2.setData({
                  songIrc: songIrc
                });
              }

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }))();
  }
});