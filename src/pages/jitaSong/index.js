import { getJitaSong } from '../../utils/actions'

import navigateTo from '../../utils/navigateTo'

// import { Page } from '../../lib/ald/ald-stat'
let Page = require('../../lib/ald/ald-stat').Page
// Page = require('../../lib/xiaoshentui/pushsdk.js').pushSdk(Page).Page

Page({
  data: {
    id: '',
    jitaSong: {},
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
    let title = '吉他'

    if (this.data.jitaSong.title && this.data.jitaSong.singer) {
      title = `${this.data.jitaSong.title}-${this.data.jitaSong.singer}【清晰吉他曲谱】`
    }

    return {
      title,
      path: `/pages/jitaSong/index?id=${this.data.id}`,
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

    const res = await getJitaSong(id)

    const jitaSong = res.data || {}

    this.setData({
      jitaSong,
    })

    if (jitaSong.title && jitaSong.singer) {
      wx.setNavigationBarTitle({
        title: `${jitaSong.title}-${jitaSong.singer}`
      })
    }
  },
  jitaSinger (event) {
    const { id } = event.currentTarget.dataset

    navigateTo(`/pages/jitaSinger/index?id=${id}`)
  },
})
