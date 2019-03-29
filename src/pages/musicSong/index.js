import { getSongIrc } from '../../utils/actions'
import decodeChar from '../../utils/decodeChar'

// import { Page } from '../../lib/ald/ald-stat'
let Page = require('../../lib/ald/ald-stat').Page
Page = require('../../lib/xiaoshentui/pushsdk.js').pushSdk(Page).Page

const app = getApp()

Page({
  data: {
    songmid: '',
    songname: '',
    albumname: '',
    singername: '',
    coverImgUrl: '',
    songSrc: '',
    speacial: 0,
    songIrc: '',
  },
  onLoad (options) {
    console.log(`Page.onLoad`, options)

    const { songmid = '', songname = '', albumname = '', singername = '', speacial = 0, } = options

    if (speacial) {
      this.setData({
        songmid: '003OUlho2HcRHC',
        songname: '告白气球',
        albumname: '我好宣你',
        singername: '徐蜗牛',
        coverImgUrl: 'https://api.bzqll.com/music/tencent/pic?id=003OUlho2HcRHC&key=579621905',
        songSrc: 'https://api.bzqll.com/music/tencent/url?id=003OUlho2HcRHC&key=579621905',
        speacial,
      })

      app.aldstat.sendEvent('播放歌曲', {
        '关键词': '徐蜗牛',
      })
    } else {
      this.setData({
        songmid,
        songname: decodeChar(songname),
        albumname: decodeChar(albumname),
        singername: decodeChar(singername),
        coverImgUrl: `https://api.bzqll.com/music/tencent/pic?id=${songmid}&key=579621905`,
        songSrc: `https://api.bzqll.com/music/tencent/url?id=${songmid}&key=579621905`,
      })

      app.aldstat.sendEvent('播放歌曲', {
        '关键词': `${decodeChar(songname)}-${decodeChar(singername)}`,
      })
    }
  },
  onShow () {
    const { songmid, songname, albumname, singername, coverImgUrl, songSrc, } = this.data

    if (songmid) {
      this.getSongIrc(songmid)

      const src = `https://api.bzqll.com/music/tencent/url?id=${songmid}&key=579621905`

      const backgroundAudioManager = wx.getBackgroundAudioManager()

      if (backgroundAudioManager.src !== src) {
        backgroundAudioManager.title = songname || '未知歌曲'
        backgroundAudioManager.epname = albumname || '未知专辑'
        backgroundAudioManager.singer = singername || '未知歌手'
        backgroundAudioManager.coverImgUrl = coverImgUrl || `https://api.bzqll.com/music/tencent/pic?id=${songmid}&key=579621905`
        backgroundAudioManager.src = songSrc || src
      }

      backgroundAudioManager.onEnded(() => {
        console.log('end', songSrc || src)
        // backgroundAudioManager.title = songname || '未知歌曲'
        // backgroundAudioManager.epname = albumname || '未知专辑'
        // backgroundAudioManager.singer = singername || '未知歌手'
        // backgroundAudioManager.coverImgUrl = coverImgUrl || `https://api.bzqll.com/music/tencent/pic?id=${songmid}&key=579621905`
        // backgroundAudioManager.src = songSrc || src
      })

      backgroundAudioManager.onError(() => {
        wx.showToast({
          title: '版权问题',
          icon: 'none',
        })
      })

      if (backgroundAudioManager.paused) {
        backgroundAudioManager.play()
      }
    }
  },
  onShareAppMessage (options) {
    const { songmid, songname, albumname, singername, speacial, } = this.data

    let title = '听歌'
    let path = '/pages/index/index'
    if (speacial) {
      title = '告白气球'
      path = '/pages/musicSong/index?speacial=1'
    } else if (songmid && songname && albumname && singername) {
      title = songname
      path = `/pages/musicSong/index?songmid=${songmid}&songname=${songname}&albumname=${albumname}&singername=${singername}`
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
  async getSongIrc (songmid) {
    const res = await getSongIrc(songmid)

    const songIrc = res.replace(/\[.*?\]/g, '').replace(/&apos;/g, "'")

    this.setData({
      songIrc,
    })
  }
})
