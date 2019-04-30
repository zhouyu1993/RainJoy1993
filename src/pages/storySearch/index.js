import { searchStory } from '../../utils/actions'
import navigateTo from '../../utils/navigateTo'

// import { Page } from '../../lib/ald/ald-stat'
let Page = require('../../lib/ald/ald-stat').Page
// Page = require('../../lib/xiaoshentui/pushsdk.js').pushSdk(Page).Page

Page({
  data: {
    value: '',
    page: 1,
    storyList: [],
    storyNum: 0,
  },
  onLoad (options) {
    console.log(`Page.onLoad`, options)

    const { value } = options

    if (value) {
      this.setData({
        value,
        page: 1,
      })

      this.searchStoryAsync()
    }
  },
  onShow () {

  },
  onShareAppMessage (options) {
    return {
      title: '小说搜索',
      path: `/pages/storySearch/index?value=${this.data.value}`,
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
  async searchStoryAsync () {
    try {
      const res = await searchStory(this.data.value, this.data.page)

      const data = res.data || []

      if (data.length) {
        this.setData({
          page: this.data.page + 1,
          storyList: this.data.storyList.concat(data),
          storyNum: res.total_num,
        })
      } else {
        wx.showToast({
          title: '没有了',
          icon: 'none',
        })
      }
    } catch (e) {
      console.log(e)
    }
  },
  toStoryInfo (event) {
    const { id } = event.currentTarget.dataset

    navigateTo(`/pages/storyInfo/index?id=${id}`)
  },
  imageError (event) {
    const { index } = event.currentTarget.dataset

    const storyList = this.data.storyList
    storyList[index].cover = 'https://wx2.sinaimg.cn/large/78ed3187ly1g2kri13rerj20bm0bmn5q.jpg'

    this.setData({
      storyList,
    })
  },
})
