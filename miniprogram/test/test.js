// miniprogram/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //test for login cloud function
      openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.testForLogin();
  },

  /**
   * test for login
   */
  testForLogin: function() {
    wx.cloud.callFunction({
      name: 'login',
      data: {

      },
      success: res => {
        console.log(res.result.openid);
      },
      fail: err => {
        console.log("error", err);
      }
    })
  }
})