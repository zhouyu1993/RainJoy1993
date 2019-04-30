import navigateTo from '../../utils/navigateTo'

// import { Page } from '../../lib/ald/ald-stat'
let Page = require('../../lib/ald/ald-stat').Page
// Page = require('../../lib/xiaoshentui/pushsdk.js').pushSdk(Page).Page

Page({
  data: {
    bookshelf: [],
  },
  onLoad (options) {
    console.log(`Page.onLoad`, options)
  },
  onShow () {
    let bookshelf = []
    try {
      bookshelf = wx.getStorageSync('bookshelf') || []
    } catch (e) {
      console.log(e)
    }

    console.log(bookshelf)

    if (bookshelf) {
      this.setData({
        bookshelf,
      })
    } else {
      wx.showToast({
        title: '快去添加好书到书架吧～',
        icon: 'none',
      })
    }
  },
  onShareAppMessage (options) {
    return {
      title: '爽爽爽～海量小说免费看！',
      path: `/pages/story/index`,
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
  toStoryInfo (event) {
    const { id } = event.currentTarget.dataset

    navigateTo(`/pages/storyInfo/index?id=${id}`)
  },
  toStoryRead (event) {
    const { id, cid, } = event.currentTarget.dataset

    navigateTo(`/pages/storyRead/index?id=${id}&cid=${cid}`)
  },
})
