'use strict';

/* eslint-disable */

var app = getApp();

Page({
  data: {
    jscode: '',
    jsonData: '',
    isShowtip: false,
    tip: '',
    idDisb: true,
    user_code: ''
  },
  onLoad: function onLoad(query) {
    this.setData({
      user_code: query.scene ? query.scene : '0'
    });
  },
  formSubmit: function formSubmit(eve) {
    var that = this;
    if (!that.data.idDisb) {
      return;
    };
    that.setData({
      idDisb: false
    });
    wx.showNavigationBarLoading();
    wx.login({
      success: function success(res) {
        if (res.code) {
          that.setData({
            jscode: res.code
          });
          wx.getSetting({
            success: function success(res) {
              if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                  success: function success(res) {
                    var data = {
                      appkey: wx.getStorageSync('t_appkey'),
                      wx_code: that.data.jscode,
                      iv: res.iv,
                      jsondata: res.encryptedData,
                      uuid: wx.getStorageSync('t_uuid'),
                      formid: eve.detail.formId,
                      user_code: that.data.user_code,
                      rawdata: res.rawData
                    };
                    wx.request({
                      url: 'https://openapi.xiaoshentui.com/Main/action/Pushmsg/Pushmsg/form_id',
                      data: data,
                      method: 'POST',
                      header: {
                        'content-type': 'application/json'
                      },
                      success: function success(res) {
                        if (res.data.code === 200) {
                          that.setData({
                            idDisb: true
                          });
                          that.setData({
                            isShowtip: true,
                            tip: res.data.message || '获取成功，请关闭小程序继续体验推送吧！'
                          });
                        } else {
                          that.setData({
                            isShowtip: true,
                            idDisb: true,
                            tip: res.data.message
                          });
                        }
                        setTimeout(function () {
                          that.setData({
                            tip: '',
                            isShowtip: false
                          });
                        }, 1500);
                        wx.hideNavigationBarLoading();
                      }
                    });
                  },
                  fail: function fail() {
                    that.setData({
                      idDisb: true
                    });
                  }
                });
              }
            }
          });
        } else {
          that.setData({
            jscode: ''
          });
        };
      }
    });
  }
});