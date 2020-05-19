// miniprogram/pages/classificationList/classificationList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['../../image/indexImage1.jpg', '../../image/indexImage2.jpg', '../../image/indexImage3.png'],
    indicatorDots: true,
    vertical: true,
    autoplay: true,
    interval: 2000,
    duration: 800,
    PictureComCount: 4,

    /**
     * 传输数据
     */
    tag: [],
    tagRecipes:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tag = []
    tag.push(options.tag)
    this.setData({
      tag: tag
    })
    console.log(tag);
    
    this.getTagRecipe()
  },

  /**
   * 获取对应tag的recipe
   */
  getTagRecipe: function () {
    wx.cloud.callFunction({
      name: "getTypeRecipeInfo",
      data: {
        tag: this.data.tag
      },
      success: res => {
        console.log(res);
        this.setData({
          tagRecipes: res.result.data
        })
      },
      fail: err => {
        console.error(err);
      }
    })
  }
})