// pages/restaurantInfo/restaurantInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 餐馆基本信息
     */
    openid: "",
    _id: "",
    restaurantInfo: {},

    /**
     * 菜谱数
     */
    recipes:[],

    /**
     * 评论数
     */
    commentList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid: options.openid,
      _id: options._id
    })
    this.getRestaurantInfo()
    this.getRecipesInfo()
  },

  /**
   * 获取餐馆信息
   */
  getRestaurantInfo: function () {
    wx.cloud.callFunction({
      name: "getUserRestaurant",
      data: {
        openid: this.data.openid
      },
      success: res => {
        console.log(res);
        this.setData({
          restaurantInfo: res.result.data[0]
        })
        console.log("餐馆信息", this.data.restaurantInfo);
      },
      fail: err => {
        console.error(err);
      }
    })
  },

  /**
   * 获取菜谱信息
   */
  getRecipesInfo: function () {
    wx.cloud.callFunction({
      name: "getUserRecipeInfo",
      data: {
        openid: this.data.openid
      },
      success: res => {
        console.log(res);
        this.setData({
          recipes: res.result.data,
        })
      },
      fail: err => {
        console.error(err);
      }
    })
  },

})