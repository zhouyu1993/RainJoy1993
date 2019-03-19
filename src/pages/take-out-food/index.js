import { getEleList } from '../../utils/actions'

// import { Page } from '../../lib/ald/ald-stat'
let Page = require('../../lib/ald/ald-stat').Page
Page = require('../../lib/xiaoshentui/pushsdk.js').pushSdk(Page).Page

Page({
  data: {
    list: [],
    latitude: '',
    longitude: '',
    offset: 0,
  },
  onLoad (options) {
    console.log(`Page.onLoad`, options)
  },
  onShow () {
    wx.getLocation({
      type: 'wgs84',
      altitude: true,
      success: res => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          offset: 0,
        })

        this.getEleList()
      },
      fail: (err) => {
        console.log('debug', err)

        wx.showToast({
          title: '定位失败',
          icon: 'none',
        })
      }
    })
  },
  onShareAppMessage (options) {
    return {
      title: '外卖',
      path: `/pages/take-out-food/index`,
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
  async getEleList () {
    try {
      const { latitude, longitude, offset, } = this.data

      const res = await getEleList(latitude, longitude, offset)

      const list = res

      list.forEach(item => {
        const delivery = item.float_delivery_fee
        const minimum_order = item.float_minimum_order_amount

        const price = []
        price[0] = delivery + minimum_order

        const business_info_parse = JSON.parse(item.business_info)
        item.business_info_parse = business_info_parse
        const p_list = business_info_parse.lemon_support_tags && business_info_parse.lemon_support_tags.filter(item => /减/.test(item.text))

        p_list.forEach((item, index) => {
          const p = item.text.split('减')
          const p0 = +p[0]
          const p1 = +p[1]

          if (!isNaN(p0) && !isNaN(p1)) {
            price[index] = delivery + p0 - p1
          }
        })

        item.price = price
      })

      const list_21 = list.filter(item => item.price[0] < 21)

      list_21.sort((a, b) => {
        return a.price[0] - b.price[0]
      })

      this.setData({
        list: this.data.list.concat(list_21),
      })
    } catch (err) {
      console.log('debug', err)
    }
  },
  getMore () {
    this.setData({
      offset: this.data.offset + 30,
    })

    this.getEleList()
  },
})
