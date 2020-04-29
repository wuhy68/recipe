// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 获取用户信息
   * 
   * @param {用户名} name 
   */
  getUserInfo: function (name) {
    wx.cloud.callFunction({
      name: "getUserInfo",
      data: {
        name: name
      },
      success: res => {
        console.log(res);
      },
      fail: err => {
        console.error(err);
      }
    })
  },

  /**
   * 添加用户信息
   * 
   * @param {用户名} name 
   * @param {用户类型} type 
   * @param {电话号码} telephone 
   * @param {经度} longtitude 
   * @param {纬度} latitude 
   */
  addUserInfo: function (name, telephone) {
    wx.cloud.callFunction({
      name: 'addUserInfo',
      data: {
        name: name,
        telephone: telephone,
      },
      success: res => {
        console.log(res);
      },
      fail: err => {
        console.error(err);
      }
    })
  },
 
  /**
   * 
   * @param {关注数} fans 
   * @param {获赞数} praises 
   */
  updateUserInfo: function(name, fans, praises) {
    wx.cloud.callFunction({
      name: 'updateUserInfo',
      data: {
        fans: fans,
        praises: praises
      },
      success: res => {
        console.log(res);
      },
      fail: err => {
        console.error(err);
      }
    })
  }
})