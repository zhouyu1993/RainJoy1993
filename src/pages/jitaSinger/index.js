import { getJitaSinger } from '../../utils/actions'

import navigateTo from '../../utils/navigateTo'

// import { Page } from '../../lib/ald/ald-stat'
let Page = require('../../lib/ald/ald-stat').Page
// Page = require('../../lib/xiaoshentui/pushsdk.js').pushSdk(Page).Page

Page({
  data: {
    id: '',
    jitaSinger: {},
  },
  onLoad (options) {
    console.log(`Page.onLoad`, options)

    const { id, } = options

    if (id) {
      this.setData({
        id,
      })

      this.getJitaSingerAsync()
    }
  },
  onShow () {

  },
  onShareAppMessage (options) {
    let title = '吉他曲谱免费放送'

    if (this.data.jitaSinger.singer_name) {
      title = `${this.data.jitaSinger.singer_name}的吉他曲谱免费放送`
    }

    return {
      title,
      path: `/pages/jitaSinger/index?id=${this.data.id}`,
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
  async getJitaSingerAsync () {
    const id = this.data.id
    if (!id) return

    const res = await getJitaSinger(id)

    const jitaSinger = res.data || {}

    this.setData({
      jitaSinger,
    })

    if (jitaSinger.singer_name) {
      wx.setNavigationBarTitle({
        title: jitaSinger.singer_name
      })
    }
  },
  toJitaSong (event) {
    const { id } = event.currentTarget.dataset

    navigateTo(`/pages/jitaSong/index?id=${id}`)
  },
})
