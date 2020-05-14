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
    background: ['cloud://recipe-ihcta.7265-recipe-ihcta-1301986134/images/indexImage1.jpg', 'cloud://recipe-ihcta.7265-recipe-ihcta-1301986134/images/indexImage2.jpg', 'cloud://recipe-ihcta.7265-recipe-ihcta-1301986134/images/indexImage3.png'],
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
  toSearchPage: function () {
    this.setData({
      search: 1
    })
  },

  /**
   * 通过控制search回到主页
   */
  toIndex: function () {
    this.setData({
      search: 0
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
    const that = this
    //查看是否授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log("用户授权了")
          app.globalData.hasLogin = true
          wx.getUserInfo({
            success: res => {
              console.log("获取用户信息成功", res)
              app.globalData.userInfo = res.userInfo
            },
            fail: res => {
              console.log("获取用户信息失败", res)
            }
          })
          wx.navigateTo({
            url: '../uploadRecipe/uploadRecipe'
          })
        } else {
          //用户没有授权
          console.log("用户没有授权")
          app.globalData.hasLogin = false
          wx.switchTab({
            url: '../userInfo/userInfo',
          })
        }
      }
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
   * 获取附近餐厅列表
   */
  toNearby: function () {
    this.setData({
      recommend: 0,
      nearby: 1,
      rank: 0
    })
    wx.chooseLocation({
      success: res => {
        wx.cloud.callFunction({
          name: "getNearby",
          data: {
            longitude: res.longitude,
            latitude: res.latitude
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
  },

  /**
   * 跳转到排行榜界面
   * 获取排行榜列表
   */
  toRank: function () {
    this.setData({
      recommend: 0,
      nearby: 0,
      rank: 1,
    })
    wx.cloud.callFunction({
      name: "getRank",
      data: {

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