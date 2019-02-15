const conf = require('./conf')

const debug = conf.debug

debug && console.log(conf)

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
      debug && console.log('网络异常')
    },
    complete = () => {},
    isSuccess = data => false,
    isNoLogin = data => false,
    noLogin = data => {
      debug && console.log((data && (data.message || data.errmsg || data.msg)) || '未登录')
    },
    error = data => {
      debug && console.log((data && (data.message || data.errmsg || data.msg)) || '接口异常')
    },
  } = option

  if (typeof fail !== 'function' || typeof complete !== 'function' || typeof isSuccess !== 'function' || typeof isNoLogin !== 'function' || typeof noLogin !== 'function' || typeof error !== 'function') return debug && console.log('参数错误')

  showLoading && wx.showLoading({ title: '加载中', })

  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      header,
      method,
      dataType,
      responseType,
      success: ({ data, }) => {
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

const xmpushReportSubmit = async (formId) => {
  debug && console.log(conf.app_key, conf.getLocation, formId)

  let systemInfo = {}
  try {
    systemInfo = wx.getSystemInfoSync()
  } catch (e) {
    debug && console.log(e)
  }

  let location = {}
  if (conf.getLocation) {
    try {
      location = await getLocation()
    } catch (e) {
      debug && console.log(e)
    }
  }

  let networkType = {}
  try {
    const res = await getNetworkType()
    networkType = res.networkType
  } catch (e) {
    debug && console.log(e)
  }

  let wifiInfo = {}
  try {
    const res = await getWifiInfo()
    wifiInfo = res.wifi
  } catch (e) {
    debug && console.log(e)
  }

  let batteryInfo = {}
  try {
    batteryInfo = wx.getBatteryInfoSync()
  } catch (e) {
    debug && console.log(e)
  }

  let hCEState = {}
  try {
    hCEState = await getHCEState()
  } catch (e) {
    debug && console.log(e)
  }

  let screenBrightness = {}
  try {
    const res = await getScreenBrightness()
    screenBrightness = res.value // 0 ~ 1，0 最暗，1 最亮
  } catch (e) {
    debug && console.log(e)
  }

  const data = {
    time: +new Date(),
    formId,
    app_key: conf.app_key,
    systemInfo,
    location,
    networkType,
    wifiInfo,
    batteryInfo,
    hCEState,
    screenBrightness,
  }

  debug && console.log(JSON.stringify(data))
}

export {
  xmpushReportSubmit,
}

export default {
  xmpushReportSubmit,
}
