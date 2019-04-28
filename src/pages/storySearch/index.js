import { searchStory } from '../../utils/actions'

// import { Page } from '../../lib/ald/ald-stat'
let Page = require('../../lib/ald/ald-stat').Page
// Page = require('../../lib/xiaoshentui/pushsdk.js').pushSdk(Page).Page

Page({
  data: {
    storyValue: '',
    storyList: [],
  },
  onLoad (options) {
    console.log(`Page.onLoad`, options)

    const { value } = options

    if (value) {
      this.setData({
        storyValue: value,
      })

      this.searchStoryAsync(value, 1)
    }
  },
  onShow () {

  },
  onShareAppMessage (options) {
    return {
      title: '小说搜索',
      path: `/pages/storySearch/index`,
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
  async searchStoryAsync (key, page) {
    try {
      const res = await searchStory(key, page)

      console.log(res)
    } catch (e) {
      console.log(e)
    }
  },
})
