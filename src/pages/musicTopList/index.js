import { getMusicTopList } from '../../utils/actions'

import navigateTo from '../../utils/navigateTo'

// import { Page } from '../../lib/ald/ald-stat'
let Page = require('../../lib/ald/ald-stat').Page
Page = require('../../lib/xiaoshentui/pushsdk.js').pushSdk(Page).Page

Page({
  data: {
    id: '',
    musicTopList: {},
  },
  onLoad (options) {
    console.log(`Page.onLoad`, options)

    const { id, } = options

    this.setData({
      id,
    })
  },
  onShow () {
    this.getData()
  },
  onShareAppMessage (options) {
    return {
      title: '排行榜',
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
    const id = this.data.id
    if (!id) return

    const res = await getMusicTopList(id)

    this.setData({
      musicTopList: res,
    })
  },
  musicSong (event) {
    const { songmid, albummid, songname, albumname, singername, } = event.currentTarget.dataset

    navigateTo(`/pages/musicSong/index?songmid=${songmid}&albummid=${albummid}&songname=${songname}&albumname=${albumname}&singername=${singername}`)
  },
})
