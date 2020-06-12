// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 用户数据
     */
    userInfo: {},
    userDetail: {},

    userCollections: [],
    userRecipes: [],
    userRestaurant: [],

    /**
     * 判断用户是否登录
     */
    isLogin: false,

    /**
     * 判断小程序的API，回调，参数，组件等是否在当前版本可用。
     */
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    /**
     * 页面切换
     */
    collection: 1,
    recipe: 0,
    restaurant: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this
    //查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("用户授权了")
          app.globalData.hasLogin = true
          that.setData({
            isHide: false
          })
          wx.getUserInfo({
            success: res => {
              console.log("获取用户信息成功", res)
              app.globalData.userInfo = res.userInfo
            },
            fail: err => {
              console.log("获取用户信息失败", err)
            }
          })
        } else {
          //用户没有授权
          console.log("用户没有授权")
          app.globalData.hasLogin = false
          that.setData({
            isHide: true
          })
        }
      }
    })
    this.getUserInfo()
    this.getRecipes()
    this.getRestaurant()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad()
  },

  /**
   * 获取用户详细信息
   */
  getUserInfo: function () {
    this.setData({
      userCollections: []
    })
    wx.cloud.callFunction({
      name: "getUserInfo",
      data: {
        openid: app.globalData.openid
      },
      success: res => {
        console.log(res);
        this.setData({
          userDetail: res.result.data[0]
        })
        for (let i = 0; i < res.result.data[0].collections.length; i++) {
          wx.cloud.callFunction({
            name: "getRecipeInfo",
            data: {
              _id: res.result.data[0].collections[i]
            },
            success: res => {
              console.log(res);
              let userCollections = this.data.userCollections
              userCollections.push(res.result.data[0])
              this.setData({
                userCollections: userCollections
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
  },

  /**
   * 获取菜谱信息
   */
  getRecipes: function () {
    wx.cloud.callFunction({
      name: "getUserRecipeInfo",
      data: {
        openid: app.globalData.openid
      },
      success: res => {
        console.log(res);
        this.setData({
          userRecipes: res.result.data,
        })
      },
      fail: err => {
        console.error(err);
      }
    })
  },

  /**
   * 获取用户餐馆
   */
  getRestaurant: function () {
    wx.cloud.callFunction({
      name: "getUserRestaurant",
      data: {
        openid: app.globalData.openid
      },
      success: res => {
        console.log(res);
        this.setData({
          userRestaurant: res.result.data
        })
      },
      fail: err => {
        console.error(err)
      }
    })
  },

  /**
   * 用户授权
   */
  bindGetUserInfo: function (res) {
    if (res.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;

      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：")
      console.log(res.detail.userInfo)

      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      })
      app.globalData.hasLogin = true
      app.globalData.userInfo = res.detail.userInfo
      console.log(app.globalData.userInfo)

      //判断用户是否曾经登陆过
      wx.cloud.callFunction({
        name: "getUserInfo",
        data: {
          openid: app.globalData.openid
        },
        success: res => {
          if (res.result.data.length == 0) {
            //如果没有，获取用户信息后，将用户信息储存在数据库中
            wx.cloud.callFunction({
              name: "addUserInfo",
              data: {
                openid: app.globalData.openid,
                nickname: app.globalData.userInfo.nickName,
                avatarUrl: app.globalData.userInfo.avatarUrl,
              },
              success: res => {
                console.log("用户创建成功");
                console.log(res);
              }
            })
          }
        },
        fail: err => {
          console.error(err);
        }
      })
      
    } 
    else {
    //用户按了拒绝按钮
    wx.showModal({
      title: '警告',
      content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
      showCancel: false,
      confirmText: '返回授权',
      success: res => {
        // 用户没有授权成功，不需要改变 isHide 的值
        if (res.confirm) {
          console.log('用户点击了“返回授权”')
        }
      }
      })
    }
  },

  /**
   * 切换到收藏界面
   */
  toCollection: function () {
    this.setData({
      collection: 1,
      recipe: 0,
      restaurant: 0
    })
  },

  /**
   * 切换到菜谱界面
   */
  toRecipe: function () {
    this.setData({
      collection: 0,
      recipe: 1,
      restaurant: 0
    })
  },

  /**
   * 切换到餐馆界面
   */
  toRestaurant: function () {
    this.setData({
      collection: 0,
      recipe: 0,
      restaurant: 1
    })
    this.getRestaurant()
  },

  /**
   * 跳转到关注列表
   */
  toFocusList: function () {
    wx.navigateTo({
      url: '../focus/focus'
    })
  },

  /**
   * 跳转到粉丝列表
   */
  toFansList: function () {
    wx.navigateTo({
      url: '../fans/fans'
    })
  }
})