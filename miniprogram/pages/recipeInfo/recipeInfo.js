// pages/recipeInfo/recipeInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    materialListCount: 7,
    StepListCount: 3,
    MaxShowComment: 2,
    StepListIndex: [
      {
        'index':1,
        'picture': '../../image/indexImage3.png',
        'info':"假期外出的同学要注意做好防护，遵守秩序，不扎堆，不聚集，注意个人卫生，做好保暖，预防感冒，同时要注意交通安全、人身财产安全等！在家的同学，也要注意个人卫生，做好保暖，预防感冒，注意防火防盗等各类安全问题。需要提醒的是，假期期间，还请同学们要坚持每日健康申报，同时遵守相关规定，无批准不能擅自返校，如有去其他城市、发烧等症状各种特殊情况，请向辅导员报备。",
      },
      {
        'index':2,
        'picture': '../../image/indexImage3.png',
        'info':"假期外出的同学要注意做好防护，遵守秩序，不扎堆，不聚集，注意个人卫生，做好保暖，预防感冒，同时要注意交通安全、人身财产安全等！在家的同学，也要注意个人卫生，做好保暖，预防感冒，注意防火防盗等各类安全问题。需要提醒的是，假期期间，还请同学们要坚持每日健康申报，同时遵守相关规定，无批准不能擅自返校，如有去其他城市、发烧等症状各种特殊情况，请向辅导员报备。",
      },
      {
        'index':3,
        'picture': '../../image/indexImage3.png',
        'info':"假期外出的同学要注意做好防护，遵守秩序，不扎堆，不聚集，注意个人卫生，做好保暖，预防感冒，同时要注意交通安全、人身财产安全等！在家的同学，也要注意个人卫生，做好保暖，预防感冒，注意防火防盗等各类安全问题。需要提醒的是，假期期间，还请同学们要坚持每日健康申报，同时遵守相关规定，无批准不能擅自返校，如有去其他城市、发烧等症状各种特殊情况，请向辅导员报备。",
      }
    ],
    CommentListIndex:[
      {
        'index':1,
        'id':'Lintiang',
        'headImage':'../../image/head.jpg',
        'time':'2020-05-04 23:20:15',
        'agreeCount':256,
        'context':"真尼玛好吃！",
      },
      {
        'index':2,
        'id':'Lintiang2',
        'headImage':'../../image/head.jpg',
        'time':'2020-05-04 23:20:15',
        'agreeCount':256,
        'context':"matrix团队有一个内部测试项目，现需要15~20名大二、大三同学参与和配合。工作时间暂定五月和六月，或面议。待遇从优。如果感兴趣的同学请填写问卷https://wj.qq.com/s2/5804387/326d/。请在五月三日前填报。！",
      },
      {
        'index':3,
        'id':'Lintiang3',
        'headImage':'../../image/head.jpg',
        'time':'2020-05-04 23:20:15',
        'agreeCount':563,
        'context':"matrix团队有一个内部测试项目，现需要15~20名大二、大三同学参与和配合。工作时间暂定五月和六月，或面议。待遇从优。如果感兴趣的同学请填写问卷https://wj.qq.com/s2/5804387/326d/。请在五月三日前填报。！",
      },
    ]
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
  addMaxShowComment: function(){
    this.MaxShowComment += 2;
  }
})