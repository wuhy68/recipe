// miniprogram/pages/userList/userList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 用户数据
     */
    openid: "",
    userInfo: {},

    userCollections: [],
    userRecipes: [],
    userRestaurant: [],

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
    console.log( options.openid);
    
    this.setData({
      openid: options.openid
    })
    this.getUserInfo()
    this.getRecipes()
    this.getRestaurant()
  },

  /**
   * 获取用户详细信息
   */
  getUserInfo: function () {
    let that = this
    this.setData({
      userCollections: []
    })
    wx.cloud.callFunction({
      name: "getUserInfo",
      data: {
        openid: this.data.openid
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
              let userCollections = that.data.userCollections
              userCollections.push(res.result.data[0])
              that.setData({
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
        openid: this.data.openid
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
        openid: this.data.openid
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
  }
})