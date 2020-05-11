// pages/ListInfo/ListInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'Title':'粤菜',
    'UserAllRecipeItemList':[
      {
        'index':1,
        'name':'北京烤鸭',
        'headImageUrl':'../../image/indexImage1.jpg',
        'postTime':'2020-05-05',
      },
      {
        'index':2,
        'name':'北京烤鸭',
        'headImageUrl':'../../image/indexImage2.jpg',
        'postTime':'2020-05-05',
      },
      {
        'index':3,
        'name':'北京烤鸭',
        'headImageUrl':'../../image/indexImage4.jpg',
        'postTime':'2020-05-05',
      },
      {
        'index':4,
        'name':'北京烤鸭',
        'headImageUrl':'../../image/indexImage5.jpg',
        'postTime':'2020-05-05',
      },
    ],
    background: ['../../image/indexImage1.jpg', '../../image/indexImage2.jpg', '../../image/indexImage3.png'],
    indicatorDots: true,
    vertical: true,
    autoplay: true,
    interval: 2000,
    duration: 800,
    PictureComCount: 4,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})