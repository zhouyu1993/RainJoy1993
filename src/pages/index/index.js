import { searchJita, getJitaHome } from '../../utils/actions'

import navigateTo from '../../utils/navigateTo'

// import { Page } from '../../lib/ald/ald-stat'
let Page = require('../../lib/ald/ald-stat').Page
// Page = require('../../lib/xiaoshentui/pushsdk.js').pushSdk(Page).Page

const app = getApp()

Page({
  data: {
    gepuValue: '',
    jitaHome: {},
  },
  onLoad (options) {
    console.log(`Page.onLoad`, options)

    this.getJitaHomeAsync()
  },
  onShow () {

  },
  onShareAppMessage (options) {
    return {
      title: '吉他曲谱免费搜索',
      path: '/pages/index/index',
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
  async getJitaHomeAsync () {
    const res = await getJitaHome()

    const data = res.data || {}

    data.singer.unshift({
      face: 'http://pu.jitami.96sn.com/singer/20150205165852_7345.jpg',
      id: 10,
      name: '林俊杰',
    })

    data.singer.unshift({
      face: 'http://pu.jitami.96sn.com/singer/20150302100911_6698.jpg',
      id: 118,
      name: '曾轶可',
    })

    this.setData({
      jitaHome: data,
    })
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
  toJitaSinger (event) {
    const { id } = event.currentTarget.dataset

    navigateTo(`/pages/jitaSinger/index?id=${id}`)
  },
  toJitaSong (event) {
    const { id } = event.currentTarget.dataset

    navigateTo(`/pages/jitaSong/index?id=${id}`)
  },
})
