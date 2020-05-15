"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  data: {
    aNum: 0
  },
  aMethod: function aMethod(num) {
    this.data.aNum += num;
  }
};