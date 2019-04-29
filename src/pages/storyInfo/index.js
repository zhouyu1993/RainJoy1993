import { getStoryInfo } from '../../utils/actions'
import fixNumber from '../../utils/fixNumber'
import formatTime from '../../utils/formatTime'
import navigateTo from '../../utils/navigateTo'

// import { Page } from '../../lib/ald/ald-stat'
let Page = require('../../lib/ald/ald-stat').Page
// Page = require('../../lib/xiaoshentui/pushsdk.js').pushSdk(Page).Page

Page({
  data: {
    id: '',
    story_info: {},
    author_info: {},
    author_book: [],
    recommend: [],
    story_like: false,
  },
  onLoad (options) {
    console.log(`Page.onLoad`, options)

    const { id } = options

    if (id) {
      this.setData({
        id,
      })

      this.getStoryInfoAsync()
    }
  },
  onShow () {

  },
  onShareAppMessage (options) {
    let title = '小说详情'
    if (this.data.story_info && this.data.story_info.book_name) {
      title = `《${this.data.story_info.book_name}》精彩极了！`
    }

    return {
      title,
      path: `/pages/storyInfo/index`,
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
  async getStoryInfoAsync () {
    try {
      const res = await getStoryInfo(this.data.id)

      const { data, author_info, author_book, recommend, } = res

      let story_like = false
      let bookshelf = []
      try {
        bookshelf = wx.getStorageSync('bookshelf') || []

        if (bookshelf.some(item => +item.id === +this.data.id)) {
          story_like = true
        }
      } catch (e) {
        console.log(e)
      }

      this.setData({
        story_info: {
          ...data,
          word_count: fixNumber(data.word_count, 1000000, 0),
          total_click: fixNumber(data.total_click, 10000000, 0),
          updated_at: formatTime(data.last_update_chapter_date, 'YY-MM-DD'),
        },
        author_info,
        author_book,
        recommend,
        story_like,
      })
    } catch (e) {
      console.log(e)
    }
  },
  toStory () {
    wx.switchTab({
      url: `/pages/story/index`,
    })
  },
  addBookshelf () {
    let bookshelf = []
    try {
      bookshelf = wx.getStorageSync('bookshelf') || []

      if (!bookshelf.some(item => +item.id === +this.data.id)) {
        const story_info = this.data.story_info

        bookshelf.push({
          id: +story_info.id,
          book_name: story_info.name,
          cover: story_info.cover,
          last_update_chapter_name: story_info.last_update_chapter_name,
          last_update_chapter_id: story_info.last_update_chapter_id,
          updated_at: story_info.updated_at,
        })

        this.setData({
          story_like: true,
        })

        wx.setStorageSync('bookshelf', bookshelf)
      }
    } catch (e) {
      console.log(e)
    }
  },
  removeBookshelf () {
    let bookshelf = []
    try {
      bookshelf = wx.getStorageSync('bookshelf') || []

      bookshelf = bookshelf.filter(item => item.id !== this.data.id)

      this.setData({
        story_like: false,
      })

      wx.setStorageSync('bookshelf', bookshelf)
    } catch (e) {
      console.log(e)
    }
  },
  toStoryVolumes () {
    navigateTo(`/pages/storyVolumes/index?id=${this.data.id}`)
  },
})
