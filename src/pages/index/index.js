import { getJitaHome } from '../../utils/actions'

import navigateTo from '../../utils/navigateTo'

// import { Page } from '../../lib/ald/ald-stat'
let Page = require('../../lib/ald/ald-stat').Page
Page = require('../../lib/xiaoshentui/pushsdk.js').pushSdk(Page).Page

Page({
  data: {
    jitaHome: {},
  },
  onLoad (options) {
    console.log(`Page.onLoad`, options)
  },
  onShow () {
    this.getData()
  },
  onShareAppMessage (options) {
    return {
      title: '吉他',
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
  async getData () {
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
  jitaSinger (event) {
    const { id } = event.currentTarget.dataset

    navigateTo(`/pages/jitaSinger/index?id=${id}`)
  },
  jitaSong (event) {
    const { id } = event.currentTarget.dataset

    navigateTo(`/pages/jitaSong/index?id=${id}`)
  },
})
