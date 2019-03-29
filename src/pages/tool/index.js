import md5 from 'crypto-js/md5'
import { Base64 } from 'js-base64'
import queryString, { parse, stringify, } from 'query-string'
// import pinyin from 'pinyin'

import { WXDATA } from '../../utils/api'
import request from '../../utils/request'
import { langDetect, searchSong } from '../../utils/actions'
import navigateTo from '../../utils/navigateTo'

// import { Page } from '../../lib/ald/ald-stat'
let Page = require('../../lib/ald/ald-stat').Page
Page = require('../../lib/xiaoshentui/pushsdk.js').pushSdk(Page).Page

const app = getApp()

const plugin = requirePlugin('WechatSI')
const manager = plugin.getRecordRecognitionManager()

Page({
  data: {
    systemInfo: {},
    userInfo: {},
    address: {},
    modal: {},
    speacialValue: '',
  },
  onLoad (options) {
    console.log(`Page.onLoad`, options)

    console.log(Base64)
    console.log(Base64.encode('你好'))
    console.log(Base64.decode('5L2g5aW9'))
    console.log(md5('12345'))
    console.log(queryString)
    console.log(parse('a=1&b=2'))
    console.log(stringify({ a: 1, b: 2 }))

    const { systemInfo, userInfo, address, } = app.globalData

    console.log(systemInfo)

    this.setData({
      systemInfo,
      userInfo,
      address,
    })

    const backgroundAudioManager = wx.getBackgroundAudioManager()

    manager.onStart = res => {
      console.log('开始识别', res)

      wx.showToast({
        title: '3秒内请说话',
        icon: 'none',
      })
    }

    manager.onStop = async res => {
      console.log('识别结果', res)

      const value = res.result

      if (!value) {
        wx.showToast({
          title: '你说啥',
          icon: 'none',
        })
      } else {
        app.aldstat.sendEvent('小雨同学', {
          '关键词': value,
        })

        try {
          const res = await langDetect(value)

          const lan = res.lan

          console.log(lan)

          let text = '你说啥'

          backgroundAudioManager.title = '小雨同学'

          if (lan === 'zh') {
            // console.log(pinyin(value))

            if (/小(宇|雨|羽|禹)同学/.test(value)) {
              text = encodeURIComponent('主人我在你说')
            } else if (/(早|中|晚)(上|午)好/.test(value)) {
              if (this.getHour() === 0) {
                text = encodeURIComponent('夜深了，别玩了，你要乖乖睡觉呦～')
              } else if (this.getHour() === 1) {
                text = encodeURIComponent('日上三竿，懒猪起床了吗？')
              } else if (this.getHour() === 2) {
                text = encodeURIComponent('现在是中午，要记得按时吃饭呀！')
              } else if (this.getHour() === 3) {
                text = encodeURIComponent('现在是下午，困了就来一杯奈雪吧！')
              } else if (this.getHour() === 4) {
                text = encodeURIComponent('晚上好，下班回家开车要小心。道路千万条，安全第一条，行车不规范，小雨两行泪。')
              } else if (this.getHour() === 5) {
                text = encodeURIComponent('快点洗澡吹头发，我先睡为敬～')
              }
            } else {
              try {
                const res = await searchSong(value, 1)

                const data = res.data || []

                if (data.length) {
                  const song = data[0]
                  const songmid = song.id
                  const songname = song.name
                  const albumname = '未知专辑'
                  const singername = song.singer

                  navigateTo(`/pages/musicSong/index?songmid=${songmid}&songname=${songname}&albumname=${albumname}&singername=${singername}`)

                  return
                }
              } catch (e) {
                console.log('searchSong', e)
              }
            }

            backgroundAudioManager.src = `https://fanyi.baidu.com/gettts?lan=zh&text=${text}&spd=5&source=web`
          } else if (lan === 'en') {
            text = encodeURIComponent('英语听不懂呢，我正在努力学习中～')

            backgroundAudioManager.src = `https://fanyi.baidu.com/gettts?lan=zh&text=${text}&spd=5&source=web`
          } else {
            backgroundAudioManager.src = `https://fanyi.baidu.com/gettts?lan=zh&text=${text}&spd=5&source=web`
          }
        } catch (e) {
          console.log(e)
        }
      }
    }

    manager.onError = res => {
      console.log('识别错误', res)

      manager.stop()

      wx.showToast({
        title: '出错了',
        icon: 'none',
      })
    }
  },
  onShow () {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo
          wx.getUserInfo({
            withCredentials: true,
            lang: this.data.systemInfo.language || 'en',
            success: res => {
              const { userInfo, } = res

              if (userInfo) {
                this.setData({
                  userInfo,
                })

                app.globalData.userInfo = userInfo
              }
            },
          })
        } else {
          this.showModal({
            content: '登录',
            confirmOpenType: 'getUserInfo',
          })
        }
      }
    })
  },
  onShareAppMessage (options) {
    return {
      title: '小工具',
      path: '/pages/tool/index',
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
      }
    }
  },
  getUserInfo (res) {
    const { userInfo, } = res.detail

    if (userInfo) {
      this.setData({
        userInfo,
      })

      app.globalData.userInfo = userInfo

      this.hideModal()
    } else {
      wx.getSetting({
        success: res => {
          if (!res.authSetting['scope.userInfo']) {
            wx.showToast({
              title: '未授权无法获取您的信息呦～',
              icon: 'none',
            })
          }
        },
      })
    }
  },
  chooseAddress () {
    wx.chooseAddress({
      success: res => {
        if (res) {
          this.setData({
            address: res,
          })

          app.globalData.address = res
        }
      },
      fail: res => {
        wx.getSetting({
          success: res => {
            if (!res.authSetting['scope.address']) {
              wx.showToast({
                title: '未授权无法获取您的地址呦～',
                icon: 'none',
              })
            }
          },
        })
      },
    })
  },
  clearStorage () {
    wx.showModal({
      title: '提示',
      content: '清除缓存',
      success: res => {
        if (res.confirm) {
          // 清理本地数据缓存
          try {
            wx.clearStorageSync()
          } catch (e) {
            console.log(e)
          }
        }
      }
    })
  },
  showModal (options = {}) {
    this.setData({
      modal: {
        visible: true,
        ...options,
      },
    })
  },
  hideModal () {
    this.setData({
      modal: {
        visible: false,
      },
    })
  },
  modalCancel () {
    wx.showToast({
      title: '不登录无法获取头像呦～',
      icon: 'none',
    })
  },
  speacialInput (event) {
    const { value } = event.detail

    this.setData({
      speacialValue: value,
    })
  },
  speacialSearch () {
    const value = this.data.speacialValue

    if (!value) return

    if (value === '徐蜗牛') {
      navigateTo(`/pages/musicSong/index?speacial=1`)
    } else {
      wx.showToast({
        title: '待开发功能～',
        icon: 'none',
      })
    }
  },
  voiceAssistant () {
    manager.start({
      duration: 3000,
      lang: 'zh_CN'
    })
  },
  getHour () {
    const time = new Date()
    const hour = time.getHours()

    if (hour >= 0 & hour < 6) {
      return 0
    } else if (hour >= 6 & hour < 11) {
      return 1
    } else if (hour >= 11 & hour < 14) {
      return 2
    } else if (hour >= 14 & hour < 18) {
      return 3
    } else if (hour >= 18 & hour < 22) {
      return 4
    } else if (hour >= 22 & hour < 24) {
      return 5
    }
  },
  takeOutFood () {
    navigateTo(`/pages/take-out-food/index`)
  },
  xmpushFormSubmit (e) {
    if (this.properties.disabled) return

    const formId = e.detail && e.detail.formId

    if (formId === 'the formId is a mock one') return console.warn(`模拟器操作不上报formid, 合法request里需要配置 ${WXDATA}`)

    wx.login({
      success: ({ code }) => {
        console.log('小米推', formId, WXDATA)

        request({
          url: `${WXDATA}/koa-demo/api/wx/sendTemplateMessage`,
          data: {
            app_key: 'abcdef',
            code,
            form_id: formId,
          },
          method: 'POST',
          showLoading: false,
          fail: () => {},
          isSuccess: () => true,
          success: res => {
            console.log(res)
          },
        })
      },
    })
  },
})
