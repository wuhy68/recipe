// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 循环背景图片
     */
    background: ['../../images/indexImage1.jpg', '../../images/indexImage2.jpg', '../../images/indexImage3.png'],
    indicatorDots: true,
    vertical: true,
    autoplay: true,
    interval: 2000,
    duration: 800,
    /**
     * 控制页面显示
     */
    search: 0,

    /**
     * 数据库数据
     */
    recipes: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecipeInfo()
  },

  /**
   * 获取所有菜单信息
   */
  getRecipeInfo: function () {
    wx.cloud.callFunction({
      name: "getAllRecipeInfo",
      success: res => {
        this.setData({
          recipes: res.result.data
        })
        console.log(res.result.data);
      },
      fail: err => {
        console.log(err);
      }
    }) 
  },

  /**
   * 通过控制search来跳转到查询页面
   */
  ToSearchPage: function () {
    this.setData({
      search: 1
    })
  },

  /**
   * 正则查询（模糊搜索）
   */
  search: function () {

  }

})