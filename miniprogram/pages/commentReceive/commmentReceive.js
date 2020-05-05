// pages/commentReceive/commmentReceive.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    MaxShowComment: 3,
    CommentListIndex:[
      {
        'index':1,
        'id':'Lintiang',
        'title':'清蒸鲈鱼',
        'headImage':'../../image/head.jpg',
        'time':'2020-05-04 23:20:15',
        'agreeCount':256,
        'context':"真尼玛好吃！",
      },
      {
        'index':2,
        'id':'Lintiang2',
        'title':'清蒸鲈鱼清蒸鲈鱼清蒸鲈鱼清蒸鲈鱼清蒸鲈鱼清蒸鲈鱼清蒸鲈鱼',
        'headImage':'../../image/head.jpg',
        'time':'2020-05-04 23:20:15',
        'agreeCount':256,
        'context':"matrix团队有一个内部测试项目，现需要15~20名大二、大三同学参与和配合。工作时间暂定五月和六月，或面议。待遇从优。如果感兴趣的同学请填写问卷https://wj.qq.com/s2/5804387/326d/。请在五月三日前填报。！",
      },
      {
        'index':3,
        'id':'Lintiang3',
        'title':'清蒸鲈鱼清蒸鲈鱼清蒸鲈鱼清蒸鲈鱼清蒸鲈鱼清蒸鲈鱼清蒸鲈鱼',
        'headImage':'../../image/head.jpg',
        'time':'2020-05-04 23:20:15',
        'agreeCount':563,
        'context':"matrix团队有一个内部测试项目，现需要15~20名大二、大三同学参与和配合。工作时间暂定五月和六月，或面议。待遇从优。如果感兴趣的同学请填写问卷https://wj.qq.com/s2/5804387/326d/。请在五月三日前填报。！",
      },
    ],
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

  },
  goToRecipeInfo: function (){
    wx.navigateTo({
      url: '../recipeInfo/recipeInfo'
    })
  }
})