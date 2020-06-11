// pages/restaurant/restaurant.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    restaurantList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllRestaurant()
  },

  onShow: function () {
    this.onLoad()
  },

  /**
   * 获取全部餐厅
   */
  getAllRestaurant: function () {
    wx.cloud.callFunction({
      name: "getAllRestaurant",
      data: {

      },
      success: res => {
        this.setData({
          restaurantList: res.result.data
        })
        console.log(res);
      },
      fail: err => {
        console.error(err);
      }
    })
  }
})