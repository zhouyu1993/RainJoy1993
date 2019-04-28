import alert from './alert'

const request = option => {
  if (typeof option === 'string') {
    option = {
      url: option,
    }
  } else if (typeof option !== 'object') {
    alert('参数错误')

    return
  }

  const {
    url,
    data,
    header = {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method = 'GET',
    dataType = 'json',
    responseType = 'text',
    showLoading = true,
    fail = res => {
      console.log(res)

      alert('网络异常')
    },
    complete = () => {},
    isSuccess = data => false,
    success = data => {},
    isNoLogin = data => false,
    noLogin = data => {
      alert((data && (data.message || data.errmsg || data.msg)) || '未登录')
    },
    error = data => {
      alert((data && (data.message || data.errmsg || data.msg)) || '接口异常')
    },
  } = option

  if (typeof fail !== 'function' || typeof complete !== 'function' || typeof isSuccess !== 'function' || typeof success !== 'function' || typeof isNoLogin !== 'function' || typeof noLogin !== 'function' || typeof error !== 'function') {
    alert('参数错误')

    return
  }

  if (showLoading) {
    wx.showLoading({ title: '加载中', })
    wx.showNavigationBarLoading()
  }

  wx.request({
    url,
    data,
    header,
    method,
    dataType,
    responseType,
    success: ({ data, }) => {
      if (showLoading) {
        wx.hideLoading()
        wx.hideNavigationBarLoading()
      }

      if (isSuccess(data) || data.code === 1001 || data.errno === 0) {
        success(data)
      } else if (isNoLogin(data) || data.code === 1024 || data.errno === 3520) {
        noLogin(data)
      } else {
        error(data)
      }
    },
    fail: res => {
      if (showLoading) {
        wx.hideLoading()
        wx.hideNavigationBarLoading()
      }

      fail(res)
    },
    complete,
  })
}

export default request
