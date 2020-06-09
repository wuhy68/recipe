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

  getUserInfo: function () {
    wx.cloud.callFunction({
      name: "getUserInfo",
      data: {
        openid: this.data.openid
      },
      success: res => {
        console.log(res);
        this.setData({
          userInfo: res.result.data[0]
        })
      },
      fail: err => {
        console.error(err);
      }
    })
  },

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