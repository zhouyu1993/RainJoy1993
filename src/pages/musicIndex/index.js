import { getMusicHome } from '../../utils/actions'

import navigateTo from '../../utils/navigateTo'

// import { Page } from '../../lib/ald/ald-stat'
let Page = require('../../lib/ald/ald-stat').Page
Page = require('../../lib/xiaoshentui/pushsdk.js').pushSdk(Page).Page

Page({
  data: {
    musicHome: {},
  },
  onLoad (options) {
    console.log(`Page.onLoad`, options)
  },
  onShow () {
    this.getData()
  },
  onShareAppMessage (options) {
    return {
      title: '音乐',
      path: '/pages/musicIndex/index',
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
    const res = await getMusicHome()

    const data = res.data || {}

    const topList = data.topList || []

    this.setData({
      musicHome: {
        topList,
      },
    })
  },
  musicTopList (event) {
    const { id } = event.currentTarget.dataset

    navigateTo(`/pages/musicTopList/index?id=${id}`)
  },
})
