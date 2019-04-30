import { getStoryHome } from '../../utils/actions'
import navigateTo from '../../utils/navigateTo'

// import { Page } from '../../lib/ald/ald-stat'
let Page = require('../../lib/ald/ald-stat').Page
// Page = require('../../lib/xiaoshentui/pushsdk.js').pushSdk(Page).Page

Page({
  data: {
    slide: [],
    books: [],
    hotkeys: [
      '医生',
      '教师',
      '保镖',
      '官场'
    ],
    storyValue: ''
  },
  onLoad (options) {
    console.log(`Page.onLoad`, options)

    this.getStoryHomeAsync()
  },
  onShow () {

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
  async getStoryHomeAsync () {
    try {
      const res = await getStoryHome()

      const { data = [], } = res

      const _data = data.filter(item => item.type !== 2)

      const __data = _data.filter(item => item.type === 1) || []

      this.setData({
        slide: (__data[0] && __data[0].lists) || [],
        books: _data.filter(item => item.type !== 1),
      })
    } catch (e) {
      console.log(e)
    }
  },
  storyInput (event) {
    const { value } = event.detail

    this.setData({
      storyValue: value,
    })
  },
  storySearch () {
    const value = this.data.storyValue

    if (!value) return

    navigateTo(`/pages/storySearch/index?value=${value}`)
  },
  async keywordStorySearch (event) {
    const { value, } = event.currentTarget.dataset

    if (!value) return

    this.setData({
      storyValue: value,
    })

    navigateTo(`/pages/storySearch/index?value=${value}`)
  },
  storySearchCancel () {
    this.setData({
      storyValue: '',
    })
  },
})
