const appId = 'wx8d1d9b1abb35ca02'
const appSecret = '59cf75d7f05d41167ac3ddff2733d88c'

const version = '1.0.2'

if (wx.setStorageSync) {
  wx.setStorageSync('appConfig', {
    appId,
    version,
  })
}

export {
  appId,
  appSecret,
  version,
}
