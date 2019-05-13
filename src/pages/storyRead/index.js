import { getStoryChapter } from '../../utils/actions'
import navigateTo from '../../utils/navigateTo'

// import { Page } from '../../lib/ald/ald-stat'
let Page = require('../../lib/ald/ald-stat').Page
// Page = require('../../lib/xiaoshentui/pushsdk.js').pushSdk(Page).Page

const app = getApp()

Page({
  data: {
    id: '',
    cid: '',
    story_info: {},
  },
  onLoad (options) {
    console.log(`Page.onLoad`, options)

    const { id, cid } = options

    if (id && cid) {
      this.setData({
        id,
        cid,
      })

      this.getStoryChapterAsync()
    }
  },
  onShow () {

  },
  // onShareAppMessage (options) {
  //   let title = '小说阅读'
  //   if (this.data.story_info && this.data.story_info.book_name) {
  //     title = `《${this.data.story_info.book_name}》精彩极了！`
  //   }
  //
  //   return {
  //     title,
  //     path: `/pages/storyRead/index?id=${this.data.id}&cid=${this.data.cid}`,
  //     success: res => {
  //       wx.showToast({
  //         title: '分享成功',
  //         icon: 'success',
  //       })
  //     },
  //     fail: res => {
  //       wx.showToast({
  //         title: '取消分享',
  //         icon: 'none',
  //       })
  //     },
  //   }
  // },
  async getStoryChapterAsync () {
    try {
      const res = await getStoryChapter(this.data.id, this.data.cid)

      const { data = {}, } = res

      this.setData({
        story_info: data,
      })

      if (data.book_name) {
        wx.setNavigationBarTitle({
          title: data.book_name
        })
      }

      let bookshelf = []
      try {
        bookshelf = wx.getStorageSync('bookshelf') || []

        bookshelf.forEach(item => {
          if (+item.id === +this.data.id) {
            item.last_read_chapter_id = data.id
          }
        })

        wx.setStorageSync('bookshelf', bookshelf)
      } catch (e) {
        console.log(e)
      }

      app.aldstat.sendEvent('阅读小说', {
        '书名': data.book_name,
        '章节名': data.name,
      })
    } catch (e) {
      console.log(e)
    }
  },
  toStoryVolumes () {
    navigateTo(`/pages/storyVolumes/index?id=${this.data.id}`)
  },
  toStoryRead (event) {
    const { cid, } = event.currentTarget.dataset

    wx.redirectTo({
      url: `/pages/storyRead/index?id=${this.data.id}&cid=${cid}`
    })
  },
})
