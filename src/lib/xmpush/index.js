const conf = require('./conf')

const debug = conf.debug

debug && console.log('debug', conf)

const WXDATA = 'http://dev.zhouyu.com:6789'

function request (option) {
  const {
    url,
    data,
    header = {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method = 'GET',
    dataType = 'json',
    responseType = 'text',
    showLoading = false,
    fail = res => {
      debug && console.log('debug', '网络异常')
    },
    complete = () => {},
    isSuccess = data => false,
    isNoLogin = data => false,
    noLogin = data => {
      debug && console.log(('debug', data && (data.message || data.errmsg || data.msg)) || '未登录')
    },
    error = data => {
      debug && console.log('debug', (data && (data.message || data.errmsg || data.msg)) || '接口异常')
    },
  } = option

  if (typeof fail !== 'function' || typeof complete !== 'function' || typeof isSuccess !== 'function' || typeof isNoLogin !== 'function' || typeof noLogin !== 'function' || typeof error !== 'function') return debug && console.log('debug', '参数错误')

  showLoading && wx.showLoading({
    title: '加载中',
  })

  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      header,
      method,
      dataType,
      responseType,
      success: ({
        data,
      }) => {
        showLoading && wx.hideLoading()

        if (isSuccess(data) || data.code === 1001 || data.errno === 0) {
          resolve(data)
        } else {
          reject(data)
        }
      },
      fail: res => {
        showLoading && wx.hideLoading()

        fail(res)

        reject(res)
      },
      complete,
    })
  }).catch(data => {
    if (isNoLogin(data) || data.code === 1024 || data.errno === 3520) {
      noLogin(data)
    } else {
      throw data
    }
  })
}

function login () {
  return new Promise((resolve, reject) => {
    wx.login({
      success (res) {
        if (res.code) {
          resolve(res.code)
        } else {
          reject(res)
        }
      },
      fail (err) {
        reject(err)
      },
    })
  }).catch(err => {
    throw err
  })
}

function getUserInfo () {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success (res) {
              resolve(res.userInfo)
            },
            fail (err) {
              reject(err)
            },
          })
        }
      },
      fail (err) {
        reject(err)
      },
    })
  }).catch(err => {
    throw err
  })
}

function getLocation () {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'wgs84',
      altitude: true,
      success (res) {
        resolve(res)
      },
      fail (err) {
        reject(err)
      },
    })
  }).catch(err => {
    throw err
  })
}

function getNetworkType () {
  return new Promise((resolve, reject) => {
    wx.getNetworkType({
      success (res) {
        resolve(res)
      },
      fail (err) {
        reject(err)
      },
    })
  }).catch(err => {
    throw err
  })
}

function getWifiInfo () {
  return new Promise((resolve, reject) => {
    wx.getConnectedWifi({
      success (res) {
        resolve(res)
      },
      fail (err) {
        reject(err)
      },
    })
  }).catch(err => {
    throw err
  })
}

function getHCEState () {
  return new Promise((resolve, reject) => {
    wx.getHCEState({
      success (res) {
        resolve(res)
      },
      fail (err) {
        reject(err)
      },
    })
  }).catch(err => {
    throw err
  })
}

function getScreenBrightness () {
  return new Promise((resolve, reject) => {
    wx.getScreenBrightness({
      success (res) {
        resolve(res)
      },
      fail (err) {
        reject(err)
      },
    })
  }).catch(err => {
    throw err
  })
}

// 注册推送服务，收集设备信息
const xmpushRegisterPush = async () => {
  let systemInfo = {}
  try {
    systemInfo = wx.getSystemInfoSync()
  } catch (e) {
    debug && console.log('debug', e)
  }

  let location = {}
  if (conf.getLocation) {
    try {
      location = await getLocation()
    } catch (e) {
      debug && console.log('debug', e)
    }
  }

  let networkType = {}
  try {
    const res = await getNetworkType()
    networkType = res.networkType
  } catch (e) {
    debug && console.log('debug', e)
  }

  let wifiInfo = {}
  try {
    const res = await getWifiInfo()
    wifiInfo = res.wifi
  } catch (e) {
    debug && console.log('debug', e)
  }

  let batteryInfo = {}
  try {
    batteryInfo = wx.getBatteryInfoSync()
  } catch (e) {
    debug && console.log('debug', e)
  }

  let hCEState = {}
  try {
    hCEState = await getHCEState()
  } catch (e) {
    debug && console.log('debug', e)
  }

  let screenBrightness = {}
  try {
    const res = await getScreenBrightness()
    screenBrightness = res.value // 0 ~ 1，0 最暗，1 最亮
  } catch (e) {
    debug && console.log('debug', e)
  }

  const data = {
    time: +new Date(),
    app_key: conf.app_key,
    systemInfo,
    location,
    networkType,
    wifiInfo,
    batteryInfo,
    hCEState,
    screenBrightness,
  }

  debug && console.log('debug', JSON.stringify(data))

  try {
    const res = await request({
      url: `${WXDATA}/api/xmpush/register`,
      data,
      method: 'POST',
      fail: () => {},
      isSuccess: () => true,
    })

    debug && console.log('debug', res)

    wx.setStorageSync('xmpushConfig', {
      'xmpush_app_key': res.xmpush_app_key
    })
  } catch (e) {
    debug && console.log('debug', e)
  }
}

// 获取用户 openId
const xmpushGetOpenId = async () => {
  try {
    const code = await login()

    const res = await request({
      url: `${WXDATA}/api/wx/code2Session?app_key=abcdef&code=${code}`,
      fail: () => {},
      isSuccess: () => true,
    })

    return res.openid
  } catch (e) {
    debug && console.log('debug', e)
  }
}

// 收集用户 openId
const xmpushSendOpenId = async (openId) => {
  let openid = ''
  if (openId) {
    openid = openId
  } else {
    try {
      openid = await xmpushGetOpenId()
    } catch (e) {
      debug && console.log('debug', e)
    }
  }

  let userInfo = {}
  try {
    userInfo = await getUserInfo()
  } catch (e) {
    debug && console.log('debug', e)
  }

  try {
    const res = await request({
      url: `${WXDATA}/api/xmpush/sendOpenId`,
      data: {
        app_key: conf.app_key,
        open_id: openid,
        user_info: userInfo
      },
      method: 'POST',
      fail: () => {},
      isSuccess: () => true,
    })

    debug && console.log('debug', res)
  } catch (e) {
    debug && console.log('debug', e)
  }
}

// 收集 formId 或 payId
const xmpushReportSubmit = async (formId) => {
  debug && console.log('debug', conf.app_key, formId)
}

// 发送消息
const xmpushSendMessage = async (formId, code) => {
  try {
    const res = await request({
      url: `${WXDATA}/api/wx/sendTemplateMessage`,
      data: {
        app_key: conf.app_key,
        code,
        form_id: formId
      },
      method: 'POST',
      fail: () => {},
      isSuccess: () => true,
    })

    debug && console.log('debug', res)
  } catch (e) {
    debug && console.log('debug', e)
  }
}

export {
  xmpushRegisterPush,
  xmpushSendOpenId,
  xmpushReportSubmit,
  xmpushSendMessage,
}

export default {
  xmpushRegisterPush,
  xmpushSendOpenId,
  xmpushReportSubmit,
  xmpushSendMessage,
}
