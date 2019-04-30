import { getStoryInfo } from '../../utils/actions'
import fixNumber from '../../utils/fixNumber'
import formatTime from '../../utils/formatTime'
import navigateTo from '../../utils/navigateTo'

// import { Page } from '../../lib/ald/ald-stat'
let Page = require('../../lib/ald/ald-stat').Page
// Page = require('../../lib/xiaoshentui/pushsdk.js').pushSdk(Page).Page

const app = getApp()

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
      path: `/pages/storyInfo/index?id=${this.data.id}`,
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

      if (!story_like) {
        wx.showToast({
          title: '加入书架后开启阅读～',
          icon: 'none',
        })
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

      if (data.book_name) {
        wx.setNavigationBarTitle({
          title: data.book_name
        })
      }
    } catch (e) {
      console.log(e)

      wx.showToast({
        title: (e.status && e.status.msg) || '图书不存在',
        icon: 'none',
      })
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
          id: story_info.id,
          book_name: story_info.book_name,
          author_name: story_info.author_name,
          cover: story_info.cover,
          last_update_chapter_name: story_info.last_update_chapter_name,
          last_update_chapter_id: story_info.last_update_chapter_id,
        })

        this.setData({
          story_like: true,
        })

        wx.setStorageSync('bookshelf', bookshelf)
      }
    } catch (e) {
      console.log(e)
    }

    app.aldstat.sendEvent('加入书架', {
      'book_id': this.data.id,
    })
  },
  removeBookshelf () {
    let bookshelf = []
    try {
      bookshelf = wx.getStorageSync('bookshelf') || []

      bookshelf = bookshelf.filter(item => +item.id !== +this.data.id)

      this.setData({
        story_like: false,
      })

      wx.setStorageSync('bookshelf', bookshelf)
    } catch (e) {
      console.log(e)
    }

    app.aldstat.sendEvent('移除书架', {
      'book_id': this.data.id,
    })
  },
  toStoryVolumes () {
    navigateTo(`/pages/storyVolumes/index?id=${this.data.id}`)
  },
  toStoryRead (event) {
    const { cid, } = event.currentTarget.dataset

    navigateTo(`/pages/storyRead/index?id=${this.data.id}&cid=${cid}`)
  },
  toStoryInfo (event) {
    const { id } = event.currentTarget.dataset

    navigateTo(`/pages/storyInfo/index?id=${id}`)
  },
  imageError (event) {
    console.log(event)

    this.setData({
      story_info: {
        ...this.data.story_info,
        cover: 'https://wx2.sinaimg.cn/large/78ed3187ly1g2kri13rerj20bm0bmn5q.jpg'
      },
    })
  },
})
