# RainJoy1993

A wx-miniprogram project

## src 目录结构

* actions 分页面管理接口请求，同 utils/actions.js
* assets 静态资源
  - img 图片
  - scss 通用样式
* components 组件
  - [computedBehavior.js](https://github.com/wechat-miniprogram/computed)
* lib 库
* pages 当前小程序的路由/页面
* projects 其他小程序的路由/页面，git clone 使用
* [store](https://github.com/Tencent/westore/) westore 状态管理、跨页通讯
* utils 常用方法
* app.js 入口文件
* [app.json](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html) 全局配置
* app.scss 全局样式
* [project.config.json](https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html) 项目配置

# [微信公众平台](https://mp.weixin.qq.com/)

账号：？

密码：？

# 管理员

？

# 帐号原始ID

？

# 绑定的微信开放平台帐号

？

# 开发设置

``` bash
# appId

wx8d1d9b1abb35ca02

`wxb82b5f0a6f566730` 测试号

# appSecret

59cf75d7f05d41167ac3ddff2733d88c

# request 合法域名

https://api.17k.com
https://api.bzqll.com
https://c.y.qq.com
https://fanyi-api.baidu.com
https://fanyi.baidu.com
https://gitlab.com
https://jitami.96sn.com
https://log.aldwx.com
https://mainsite-restapi.ele.me
https://openapi.xiaoshentui.com
https://plog.xiaoshentui.com

# socket合法域名

# uploadFile合法域名

# downloadFile 合法域名

# web-view(业务域名)-需运维在服务器根目录加文件

# 关联的公众号

wx7208a4af2628818b

# 阿拉丁 app_key

40ef4b814911dc0f6d48f5c49b70aa42

# 阿拉丁小神推 app_key

360065b5abadcaca47ca254f8f5d3f8a
```

# Pages

* /pages/index/index
* /pages/tool/index

---

# [小程序开发指南](https://developers.weixin.qq.com/ebook?action=get_post_info)

# [小程序介绍](https://developers.weixin.qq.com/miniprogram/introduction/)

# [小程序开发教程](https://developers.weixin.qq.com/miniprogram/dev)

# 性能优化

## 启动性能优化

* 资源控制
  - 开启开发工具”上传代码时自动压缩”
  - 及时清理无用代码和资源文件
* 图片资源
  - 图片资源尽量引用网络资源(CDN)，使用图片压缩
  - 图片资源的主要性能问题在于大图片和长列表图片上，这两种情况都有可能导致 iOS 客户端内存占用上升，从而触发系统回收小程序页面
  - 在 iOS 上，小程序的页面是由多个 WKWebView 组成的，在系统内存紧张时，会回收掉一部分 WKWebView
  - 除了内存问题外，大图片也会造成页面切换的卡顿
* [分包加载](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages.html)
  - 使用分包
  - 独立分包
  - 分包预下载

## 首屏性能优化

* 提前请求：异步数据数据请求不需要等待页面渲染完成(主接口、次接口)
* 利用缓存：利用 `storage` 对异步请求数据进行缓存，二次启动时先利用缓存数据渲染页面，再进行后台更新。有点类似于 `ServiceWorker`
* 避免白屏：先展示页面骨架和基础内容(预设值、默认值)
* 及时反馈：及时地对需要用户等待的交互操作给出反馈，避免用户以为小程序没有响应(兜底值、异常提示)

## 渲染性能优化

小程序框架的核心是一个响应的数据绑定系统。

整个小程序框架系统分为两部分：视图层(View)和逻辑层(App Service)

小程序框架可以让数据与视图非常简单地保持同步。当做数据修改的时候，只需要在逻辑层修改数据，视图层就会做相应的更新。

小程序的视图层目前使用 WebView 作为渲染载体，而逻辑层是由独立的 JavaScriptCore 作为运行环境。在架构上，WebView 和 JavaScriptCore 都是独立的模块，并不具备数据直接共享的通道。当前，视图层和逻辑层的数据传输，实际上通过两边提供的 evaluateJavaScript 所实现。即用户传输的数据，需要将其转换为字符串形式传递，同时把转换后的数据内容拼接成一份 JS 脚本，再通过执行 JS 脚本的形式传递到两边独立环境。

| 运行环境 | 逻辑层 | 渲染层 |
| :------------- | :------------- | :------------- |
| iOS | JavaScriptCore | WKWebView |
| 安卓 | X5 JSCore | X5 浏览器 |
| 小程序开发者工具 | XNWJS | Chrome WebView |

* 渲染层和逻辑层通信模型

![渲染层和逻辑层通信模型](https://cmspic-10004025.image.myqcloud.com/1df7eb40-e710-11e8-8d09-a7a61b530e5c_size_2356x1746)

* 逻辑层传递数据到渲染层

![逻辑层传递数据到渲染层](https://cmspic-10004025.image.myqcloud.com/3af15e70-e710-11e8-8d09-a7a61b530e5c_size_1178x832)

而 evaluateJavaScript 的执行会受很多方面的影响，数据到达视图层并不是实时的。也就是说，WebView 和 JavaScriptCore 之间的通信，是一个跨进程通信，是非常耗时的一个过程。

* 频繁的去 setData
  - Android 下用户在滑动时会感觉到卡顿，操作反馈延迟严重，因为 JS 线程一直在编译执行渲染，未能及时将用户操作事件传递到逻辑层，逻辑层亦无法及时将操作处理结果及时传递到视图层；
  - 渲染有出现延时，由于 WebView 的 JS 线程一直处于忙碌状态，逻辑层到页面层的通信耗时上升，视图层收到的数据消息时距离发出时间已经过去了几百毫秒，渲染的结果并不实时；
* 每次 setData 都传递大量新数据
  - 由setData的底层实现可知，我们的数据传输实际是一次 evaluateJavaScript 脚本过程，当数据量过大时会增加脚本的编译执行时间，占用 WebView JS 线程
  - 不要所有所有数据都 setData，尽量只 setData 页面渲染需要的数据
* 后台态页面进行 setData
  - 当页面进入后台态(用户不可见)，不应该继续去进行 setData，后台态页面的渲染用户是无法感受的，另外后台态页面 去setData 也会抢占前台页面的执行

# 基础库版本与 API 兼容

可以通过 wx.getSystemInfo 或者 wx.getSystemInfoSync 获取到小程序的基础库版本号。

也可以通过 wx.canIUse 详情 来判断是否可以在该基础库版本下直接使用对应的API或者组件。

# 特殊的方法和属性

* getApp 和 getCurrentPages
* this.route

# 注意

本框架试用了一些测试基础配置，在实际使用过程中需要自行修改一些配置，如：

* `/src/project.config.json` 里
  - projectname
  - app_id
  - libVersion
  - setting
  - etc.
* `/src/utils/constants.js` 里
  - app_id
  - app_secret 但一般不准露出
* `/src/lib/ald/ald-stat-conf.js` 里
  - ald_app_key
  - app_id
  - app_secret 但一般不准露出
* `/src/utils/api.js` 里
  - WXDATA 点击上报，demo 里是假域名
  - 项目相关域名统一在这里配置

## API

---

song_id: 214160684

song_mid: 003rwlte1mgeSh

https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg?nobase64=1&musicid=214160684&songtype=0

singer_id: 19633

singer_mid 001Z043U01BqsW

https://y.gtimg.cn/music/photo_new/T001R68x68M000001Z043U01BqsW.jpg?max_age=2592000

album_id: 4091728

album_mid: 000OojoN2517uS

https://y.gtimg.cn/music/photo_new/T002R300x300M000000OojoN2517uS.jpg?max_age=2592000

---

https://c.y.qq.com/v8/fcg-bin/fcg_myqq_topList.fcg?format=json

---

https://gitlab.com/zhouyu1993/wx-miniprogram-config/raw/master/RainJoy1993/index.json

https://gitlab.com/zhouyu1993/wx-miniprogram-config/raw/master/RainJoy1993/english-words.json

---

https://api.bzqll.com/music/tencent/search?key=579621905&s=秦时明月&limit=10&offset=1&type=song

1. 音乐搜索: type=song
2. 专辑搜索: type=album
3. 歌单搜索: type=list (QQ音乐限制歌单每页最多查询50条)
4. MV搜索: type=mv
5. 用户搜索: type=user
6. 歌词搜索: type=lrc

https://api.bzqll.com/music/tencent/url?id=002GrJ771EmliH&key=579621905

---

https://jitami.96sn.com/api/home/index

https://jitami.96sn.com/api/home/index/search?key=天空之城

https://jitami.96sn.com/api/home/index/singer_detail?id=25

https://jitami.96sn.com/api/home/index/pu?id=1326

http://pu.jitami.96sn.com/singer/20150205155854_9468.png

http://pu.jitami.96sn.com/20150205172013_8179.gif

---

https://api.17k.com/v2/book/boutique/bookstore?app_key=2263049103&_versions=973&client_type=998&channel=8&merchant=17KTest&_access_version=2&cps=0&cps_source=0&cps_opid=0&type=1&client=17K

key=医生，page=1，搜索

https://api.17k.com/v2/book/search?app_key=2263049103&_versions=973&client_type=998&channel=8&merchant=17KTest&_access_version=2&cps=0&cps_source=0&cps_opid=0&key=医生&page=1&num=24&_fields=cover,author_name,book_name,book_id,total_num,total_page,cur_page,intro,category_name_2,book_status,word_count,total_chapter,keyword

342881，简介

https://api.17k.com/v2/book/342881/merge?app_key=2263049103&_versions=973&client_type=998&channel=8&merchant=17KTest&_access_version=2&cps=0&cps_source=0&cps_opid=0&iltc=1&time=1556439563145

342881，目录

https://api.17k.com/v2/book/342881/volumes?app_key=2263049103&_versions=973&client_type=998&channel=8&merchant=17KTest&_access_version=2&cps=0&cps_source=0&cps_opid=0&_fields=id,volumes,chapters,name,vip,book_name

7744044，章节

https://api.17k.com/v2/book/weixin/342881/chapter/7744044/content?name=0&app_key=2263049103&data={}&sign=9a430b92c5b3bfdfeceb986fbdf5040b
