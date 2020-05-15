'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var alert = function alert(content) {
  wx.showModal({
    title: '提示',
    showCancel: false,
    content: content
  });
};

exports.default = alert;