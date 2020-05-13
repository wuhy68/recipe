// miniprogram/pages/index/index.js
const app = getApp()
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
    recommend: 1,
    nearby: 0,
    rank: 0,

    /**
     * 数据库数据
     */
    recipes: [],
    nearbyRestaurant: [],
    rankRecipe: [],

    /**
     * 查询数据
     */
    searchVal: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecipeInfo(),
    this.getNearbyRestaurant(),
    this.getRank()
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
   * 获取附近餐厅
   */
  getNearbyRestaurant: function () {

  },

  /**
   * 获取菜谱排行榜
   */
  getRank: function () {

  },

  /**
   * 通过控制search来跳转到查询页面
   */
  toSearchPage: function () {
    this.setData({
      search: 1
    })
  },

  /**
   * 读取搜索框输入的数据
   * @param {dataset} e 
   */
  input: function (e) {
    this.setData({
      searchVal: e.detail.value
    })
    console.log(this.data.searchVal);
  },

  /**
   * 正则查询（模糊搜索）
   */
  search: function () {
    wx.cloud.callFunction({
      name: "getSearchRecipeInfo",
      data: {
        name: this.data.searchVal
      },
      success: res => {
        this.setData({
          recipes: res.result.data
        })
        console.log(res.result.data);
      },
      fail: err => {
        console.error(err);
      }
    })
  },

  /**
   * 
   */
  toUploadRecipe: function () {
    wx.navigateTo({
      url: '../uploadRecipe/uploadRecipe'
    })
  },

  /**
   * 跳转到每日必恰界面
   */
  toRecommendation: function () {
    this.setData({
      recommend: 1,
      nearby: 0,
      rank: 0
    })
  },

  /**
   * 跳转到附近餐厅界面
   */
  toNearby: function () {
    this.setData({
      recommend: 0,
      nearby: 1,
      rank: 0
    })
  },

  /**
   * 跳转到排行榜界面
   */
  toRank: function () {
    this.setData({
      recommend: 0,
      nearby: 0,
      rank: 1,
    })
  },


})