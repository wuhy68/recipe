// miniprogram/pages/fans/fans.js
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
  fansList: [],

  /**
   * 关注标签
   * 判断用户是否被关注
   */
  fansFlag: []
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

        this.judgeFocus(res.result.data[0])

        for (let i = 0; i < this.data.userInfo.fans.length; i++) {
          wx.cloud.callFunction({
            name: "getUserInfo",
            data: {
              openid: this.data.userInfo.fans[i]
            },
            success: res => {
              console.log(res)
              let fansList = this.data.fansList
              fansList.push(res.result.data[0])
              this.setData({
                fansList: fansList
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

    

    console.log("粉丝列表", this.data.fansList);
  },

  /**
   * 设定标签判断是否被关注
   */
  judgeFocus: function (userInfo) {
    let fansFlag =  []
    for (let i = 0; i < userInfo.fans.length; i++) {
      let flag = userInfo.focus.indexOf(userInfo.fans[i])
      if (flag == -1) {
        fansFlag.push(false);
      } 
      else {
        fansFlag.push(true);
      }
    }
    this.setData({
      fansFlag: fansFlag
    })
    console.log("用户标签", fansFlag);
    
  },

  /**
   * 添加关注
   */
  addFocus: function (e) {
    let focus = this.data.userInfo.focus
    focus.push(e.currentTarget.dataset.openid)
    wx.cloud.callFunction({
      name: "updateUserInfo",
      data: {
        openid: app.globalData.openid,
        focus: focus
      },
      success: res => {
        console.log(res);
        console.log("关注成功");
      },
      fail: err => {
        console.error(err);
      }
    })

    // 获取选取用户的数据
    let fans = []
    wx.cloud.callFunction({
      name: "getUserInfo",
      data: {
        openid: e.currentTarget.dataset.openid
      },
      success: res => {
        console.log(res);
        fans = res.result.data[0].fans
      },
      fail: err => {
        console.error(err);
      }
    })
    
    fans.push(app.globalData.openid)
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
    let fansFlag = this.data.fansFlag
    let fansList = this.data.fansList
    let userInfo = this.data.userInfo

    fansFlag[e.currentTarget.dataset.index] = true
    fansList[e.currentTarget.dataset.index].fans = fans
    userInfo.focus = focus

    this.setData({
      fansFlag: fansFlag,
      fansList: fansList,
      userInfo: userInfo
    })
  },

  /**
   * 取消关注
   */
  deleteFocus: function (e) {
    let focus = []
    for (let i = 0; i < this.data.userInfo.focus.length; i++) {
      if (this.data.userInfo.focus[i] != e.currentTarget.dataset.openid) {
        focus.push(this.data.userInfo.focus[i])
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
    let fansFlag = this.data.fansFlag
    let fansList = this.data.fansList
    let userInfo = this.data.userInfo

    fansFlag[e.currentTarget.dataset.index] = false
    fansList[e.currentTarget.dataset.index].fans = fans
    userInfo.focus = focus

    this.setData({
      fansFlag: fansFlag,
      fansList: fansList,
      userInfo: userInfo
    })
  },
})