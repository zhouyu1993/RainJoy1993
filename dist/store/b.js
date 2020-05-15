"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  data: {
    bNum: 0
  },
  bMethod: function bMethod(num) {
    this.data.bNum -= num;
  }
};