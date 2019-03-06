// import { Page } from '../../lib/ald/ald-stat'
let Page = require('../../lib/ald/ald-stat').Page
Page = require('../../lib/xiaoshentui/pushsdk.js').pushSdk(Page).Page

Page({
  data: {
    songmid: '',
    albummid: '',
    songname: '',
    albumname: '',
    singername: '',
    speacial: 0,
  },
  onLoad (options) {
    console.log(`Page.onLoad`, options)

    const { songmid = '', albummid = '', songname = '', albumname = '', singername = '', speacial = '', } = options

    this.setData({
      songmid,
      albummid,
      songname,
      albumname,
      singername,
      speacial,
    })
  },
  onShow () {
    const { songmid, albummid, songname, albumname, singername, speacial, } = this.data

    const backgroundAudioManager = wx.getBackgroundAudioManager()

    if (speacial) {
      const src = `https://api.bzqll.com/music/tencent/url?id=003OUlho2HcRHC&key=579621905`

      if (backgroundAudioManager.src !== src) {
        backgroundAudioManager.title = '告白气球'
        backgroundAudioManager.epname = '我好宣你'
        backgroundAudioManager.singer = '徐蜗牛'
        backgroundAudioManager.coverImgUrl = `http://cmspic-10004025.image.myqcloud.com/0b23e778-b411-4f92-9bfe-0390e7e8609a`
        backgroundAudioManager.src = src
      }
    } else {
      const src = `https://api.bzqll.com/music/tencent/url?id=${songmid}&key=579621905&br=320`

      if (backgroundAudioManager.src !== src) {
        backgroundAudioManager.title = songname || '歌曲名称'
        backgroundAudioManager.epname = albumname || '专辑名称'
        backgroundAudioManager.singer = singername || '歌手名称'
        backgroundAudioManager.coverImgUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg`
        backgroundAudioManager.src = `https://api.bzqll.com/music/tencent/url?id=${songmid}&key=579621905&br=320`
      }
    }
  },
  onShareAppMessage (options) {
    const { songmid, albummid, songname, albumname, singername, speacial, } = this.data

    let title = '听歌'
    let path = '/pages/index/index'
    if (speacial) {
      title = '告白气球'
      path = '/pages/musicSong/index?speacial=1'
    } else if (songmid && albummid && songname && albumname && singername) {
      title = songname
      path = `/pages/musicSong/index?songmid=${songmid}&albummid=${albummid}&songname=${songname}&albumname=${albumname}&singername=${singername}`
    }

    return {
      title,
      path,
      success: res => {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
        })
      },
      fail: res => {
        wx.showToast({
          title: '取消分享',
          icon: 'none',
        })
      },
    }
  },
})
