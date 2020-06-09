// miniprogram/pages/focus/focus.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  /**
   * 用户信息
   */
  userInfo: {},

  /**
   * 关注列表
   */
  focusList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
  },

  /**
   * 获取用户信息
   */
  getUserInfo: function () {
    wx.cloud.callFunction({
      name: "getUserInfo",
      data: {
        openid: app.globalData.openid
      },
      success: res => {
        console.log(res);
        this.setData({
          userInfo: res.result.data[0]
        })
        console.log("用户数据",this.data.userInfo);
        for (let i = 0; i < this.data.userInfo.focus.length; i++) {
          wx.cloud.callFunction({
            name: "getUserInfo",
            data: {
              openid: this.data.userInfo.focus[i]
            },
            success: res => {
              console.log(res)
              let focusList = this.data.focusList
              focusList.push(res.result.data[0])
              this.setData({
                focusList: focusList
              })
            },
            fail: err => {
              console.error(err);
            }
          })
        }

      },
      fail: err => {
        console.error(err);
      }
    })
    console.log("关注列表", this.data.focusList);
    
  },

  /**
   * 取消关注
   */
  deleteFocus: function (e) {
    console.log(e.currentTarget.dataset.openid);
    
    let focus = []
    for (let i = 0; i < this.data.focusList.length; i++) {
      if (this.data.focusList[i].openid != e.currentTarget.dataset.openid) {
        focus.push(this.data.focusList[i].openid)
      }
    }
    wx.cloud.callFunction({
      name: "updateUserInfo",
      data: {
        openid: app.globalData.openid,
        focus: focus
      },
      success: res => {
        console.log(res);
        console.log("取消关注");
      },
      fail: err => {
        console.error(err);
      }
    })

    // 获取被取消关注的用户信息
    let fans_ = [] // 取消关注前
    let fans = [] // 取消关注后
    wx.cloud.callFunction({
      name: "getUserInfo",
      data: {
        openid: e.currentTarget.dataset.openid
      },
      success: res => {
        console.log(res);
        fans_ = res.result.data[0].fans
      },
      fail: err => {
        console.error(err);
      }
    })

    for (let i = 0; i < fans_.length; i++) {
      if (fans_[i] != app.globalData.openid) {
        fans.push(fans_[i])
      }
    }

    wx.cloud.callFunction({
      name: "updateUserInfo",
      data: {
        openid: e.currentTarget.dataset.openid,
        fans: fans
      },
      success: res => {
        console.log(res);
      },
      fail: err => {
        console.error(err);
      }
    })

    // 更新数据
    let focusList = []
    for (let i = 0; i < this.data.focusList.length; i++) {
      if (this.data.focusList[i].openid != e.currentTarget.dataset.openid) {
        focusList.push(this.data.focusList[i])
      }
    }

    this.setData({
      focusList: focusList
    })
  },
})