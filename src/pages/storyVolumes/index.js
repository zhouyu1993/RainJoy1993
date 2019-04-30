import { getStoryVolumes } from '../../utils/actions'
import navigateTo from '../../utils/navigateTo'

// import { Page } from '../../lib/ald/ald-stat'
let Page = require('../../lib/ald/ald-stat').Page
// Page = require('../../lib/xiaoshentui/pushsdk.js').pushSdk(Page).Page

Page({
  data: {
    id: '',
    story_info: {},
    last_read_chapter_id: '',
  },
  onLoad (options) {
    console.log(`Page.onLoad`, options)

    const { id } = options

    if (id) {
      this.setData({
        id,
      })

      this.getStoryVolumesAsync()
    }
  },
  onShow () {

  },
  onShareAppMessage (options) {
    let title = '小说目录'
    if (this.data.story_info && this.data.story_info.book_name) {
      title = `《${this.data.story_info.book_name}》精彩极了！`
    }

    return {
      title,
      path: `/pages/storyVolumes/index?id=${this.data.id}`,
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
  async getStoryVolumesAsync () {
    try {
      const res = await getStoryVolumes(this.data.id)

      const { data, } = res

      console.log(data)

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

        const book = bookshelf.find(item => +item.id === +this.data.id)
        if (book) {
          this.setData({
            last_read_chapter_id: book.last_read_chapter_id,
          })
        }
      } catch (e) {
        console.log(e)
      }
    } catch (e) {
      console.log(e)
    }
  },
  toStory () {
    wx.switchTab({
      url: `/pages/story/index`,
    })
  },
  toStoryLibrary () {
    navigateTo(`/pages/storyLibrary/index`)
  },
  toStoryRead (event) {
    const { cid, } = event.currentTarget.dataset

    navigateTo(`/pages/storyRead/index?id=${this.data.id}&cid=${cid}`)
  },
})
