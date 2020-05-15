'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @name 过滤协议
* @param { String } url [资源地址]
 */

var protocol = function protocol(url) {
  if (!url || typeof url !== 'string') return '';

  return url.replace(/^http(s?):/, 'https:');
};

exports.default = protocol;