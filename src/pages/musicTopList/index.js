import { getMusicTopList, getRainJoy1993Config } from '../../utils/actions'

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
      path: `/pages/musicTopList/index?id=${this.data.id}`,
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
  async getRainJoy1993Config () {
    try {
      const res = await getRainJoy1993Config()

      return res.data.canplay
    } catch (e) {
      return false
    }
  },
  async musicSong (event) {
    const { songmid = '', songname = '未知歌曲', albumname = '未知专辑', singername = '未知歌手', } = event.currentTarget.dataset

    const canplay = await this.getRainJoy1993Config()

    if (canplay && songmid) {
      navigateTo(`/pages/musicSong/index?songmid=${songmid}&songname=${songname}&albumname=${albumname}&singername=${singername}`)
    } else {
      wx.showModal({
        title: '歌曲介绍',
        content: songname,
        showCancel: false,
      })
    }
  },
  showInfo (event) {
    const { text, } = event.currentTarget.dataset

    if (text) {
      wx.showToast({
        title: text,
        icon: 'none',
      })
    }
  },
})
