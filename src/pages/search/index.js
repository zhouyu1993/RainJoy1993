import { getHotKey, searchJita } from '../../utils/actions'
import { CYQQ } from '../../utils/api'
import request from '../../utils/request'
import navigateTo from '../../utils/navigateTo'

// import { Page } from '../../lib/ald/ald-stat'
let Page = require('../../lib/ald/ald-stat').Page
Page = require('../../lib/xiaoshentui/pushsdk.js').pushSdk(Page).Page

Page({
  data: {
    gepuValue: '',
    jitaData: {},
    hotkeys: [],
  },
  onLoad (options) {
    console.log(`Page.onLoad`, options)
  },
  onShow () {
    this.getHotKeyAsync()

    // this.getHotKey()
  },
  onShareAppMessage (options) {
    return {
      title: '搜索',
      path: '/pages/search/index',
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
  gepuInput (event) {
    const { value } = event.detail

    this.setData({
      gepuValue: value,
    })
  },
  async gepuSearch () {
    const value = this.data.gepuValue

    if (!value) return

    try {
      const res = await searchJita(value)

      const data = res.data || {}

      this.setData({
        jitaData: data,
      })
    } catch (e) {
      console.log(e)
    }
  },
  jitaSinger (event) {
    const { id } = event.currentTarget.dataset

    navigateTo(`/pages/jitaSinger/index?id=${id}`)
  },
  jitaSong (event) {
    const { id } = event.currentTarget.dataset

    navigateTo(`/pages/jitaSong/index?id=${id}`)
  },
  async getHotKeyAsync () {
    try {
      const res = await getHotKey()

      const data = res.data || {}
      const hotkeys = data.hotkey || []
      const special_key = data.special_key || ''

      if (special_key) {
        hotkeys.unshift({
          k: special_key,
          n: 0,
        })
      }

      if (hotkeys.length) {
        this.setData({
          hotkeys,
        })
      }
    } catch (e) {
      console.log(e)
    }
  },
  getHotKey () {
    request({
      url: `${CYQQ}/splcloud/fcgi-bin/gethotkey.fcg?gformat=json`,
      showLoading: false,
      fail: () => {},
      isSuccess: res => res.code === 0,
      success: res => {
        const data = res.data || {}
        const hotkeys = data.hotkey || []
        const special_key = data.special_key || ''

        if (special_key) {
          hotkeys.unshift({
            k: special_key,
            n: 0,
          })
        }

        if (hotkeys.length) {
          this.setData({
            hotkeys,
          })
        }
      },
    })
  },
  toSearchMusic () {
    wx.showToast({
      title: 'hello',
      icon: 'none',
    })
  },
})
