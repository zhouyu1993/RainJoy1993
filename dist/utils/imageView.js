'use strict';

var _protocol = require('./protocol.js');

var _protocol2 = _interopRequireDefault(_protocol);

var _imageOptimizer = require('./imageOptimizer.js');

var _imageOptimizer2 = _interopRequireDefault(_imageOptimizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name 万像优图+过滤协议+webp
 * @param  { String } src 图片地址，必须是腾讯云
 * @param  { Number, String } width 图片宽
 * @param  { Number, String } height 图片高
 * @param  { String } type 图片类型
 * @param  { Number, String } way 优化方式。0-5是基本图像处理接口；否则是高级图像处理接口，用字符串表示。具体看文档
 * @param  { Number, String } quality 图片质量。默认 85
 */

var imageView = function imageView() {
  var src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var width = arguments[1];
  var height = arguments[2];
  var type = arguments[3];
  var way = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var quality = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 85;

  try {
    if (typeof src !== 'string') return src;
    if (!src) return '';
    src = (0, _protocol2.default)(src);
    return (0, _imageOptimizer2.default)(src, width, height, type, way, quality);
  } catch (e) {
    console.log(e);
    return src;
  }
};

module.exports = imageView;