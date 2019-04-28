import { getHotKey, searchJita, searchSong } from '../../utils/actions'
// import { CYQQ } from '../../utils/api'
// import request from '../../utils/request'
import navigateTo from '../../utils/navigateTo'

// import { Page } from '../../lib/ald/ald-stat'
let Page = require('../../lib/ald/ald-stat').Page
Page = require('../../lib/xiaoshentui/pushsdk.js').pushSdk(Page).Page

const app = getApp()

Page({
  data: {
    gepuValue: '',
    jitaData: {},
    hotkeys: [],
    songValue: '',
    page: 1,
    songData: [],
  },
  onLoad (options) {
    console.log(`Page.onLoad`, options)
  },
  onShow () {
    this.getHotKeyAsync()

    // this.getHotKey()
  },
  onShareAppMessage (options) {
    return {
      title: '搜索',
      path: '/pages/search/index',
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
  gepuInput (event) {
    const { value } = event.detail

    this.setData({
      gepuValue: value,
    })
  },
  async gepuSearch () {
    const value = this.data.gepuValue

    if (!value) return

    try {
      const res = await searchJita(value)

      const data = res.data || {}

      this.setData({
        jitaData: data,
      })

      app.aldstat.sendEvent('搜索歌谱', {
        '关键词': value,
      })
    } catch (e) {
      console.log(e)
    }
  },
  gepuSearchCancel () {
    this.setData({
      gepuValue: '',
      jitaData: {},
    })
  },
  jitaSinger (event) {
    const { id } = event.currentTarget.dataset

    navigateTo(`/pages/jitaSinger/index?id=${id}`)
  },
  jitaSong (event) {
    const { id } = event.currentTarget.dataset

    navigateTo(`/pages/jitaSong/index?id=${id}`)
  },
  async getHotKeyAsync () {
    try {
      const res = await getHotKey()

      const data = res.data || {}
      const hotkeys = data.hotkey || []
      const special_key = data.special_key || ''

      if (special_key) {
        hotkeys.unshift({
          k: special_key,
          n: 0,
        })
      }

      if (hotkeys.length) {
        this.setData({
          hotkeys,
        })
      }
    } catch (e) {
      console.log(e)
    }
  },
  // getHotKey () {
  //   request({
  //     url: `${CYQQ}/splcloud/fcgi-bin/gethotkey.fcg?gformat=json`,
  //     showLoading: false,
  //     fail: () => {},
  //     isSuccess: res => res.code === 0,
  //     success: res => {
  //       const data = res.data || {}
  //       const hotkeys = data.hotkey || []
  //       const special_key = data.special_key || ''
  //
  //       if (special_key) {
  //         hotkeys.unshift({
  //           k: special_key,
  //           n: 0,
  //         })
  //       }
  //
  //       if (hotkeys.length) {
  //         this.setData({
  //           hotkeys,
  //         })
  //       }
  //     },
  //   })
  // },
  songInput (event) {
    const { value } = event.detail

    this.setData({
      songValue: value,
    })
  },
  async songSearch () {
    const value = this.data.songValue

    if (!value) return

    try {
      const res = await searchSong(value, 1)

      const data = res.data || []

      if (data.length) {
        this.setData({
          songValue: value,
          page: 1,
          songData: data,
        })
      } else {
        wx.showToast({
          title: '无结果',
          icon: 'none',
        })
      }

      app.aldstat.sendEvent('搜索歌曲', {
        '关键词': value,
      })
    } catch (e) {
      console.log(e)
    }
  },
  async keywordSongSearch (event) {
    const { value, } = event.currentTarget.dataset

    if (!value) return

    try {
      const res = await searchSong(value, 1)

      const data = res.data || []

      if (data.length) {
        this.setData({
          songValue: value,
          page: 1,
          songData: data,
        })
      } else {
        wx.showToast({
          title: '无结果',
          icon: 'none',
        })
      }

      app.aldstat.sendEvent('搜索歌曲', {
        '关键词': value,
      })
    } catch (e) {
      console.log(e)
    }
  },
  async moreSongSearch (event) {
    const value = this.data.songValue

    if (!value) return

    try {
      const page = this.data.page + 1
      const res = await searchSong(value, page)

      const data = res.data || []

      if (data.length) {
        this.setData({
          songValue: value,
          page,
          songData: this.data.songData.concat(data),
        })
      } else {
        wx.showToast({
          title: '没有了',
          icon: 'none',
        })
      }
    } catch (e) {
      console.log(e)
    }
  },
  songSearchCancel () {
    this.setData({
      songValue: '',
      page: 1,
      songData: [],
    })
  },
  async musicSong (event) {
    const { songmid = '', songname = '未知歌曲', albumname = '未知专辑', singername = '未知歌手', } = event.currentTarget.dataset

    navigateTo(`/pages/musicSong/index?songmid=${songmid}&songname=${songname}&albumname=${albumname}&singername=${singername}`)
  },
})
