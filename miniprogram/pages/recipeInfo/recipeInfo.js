// pages/recipeInfo/recipeInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 页面内容设置
     */
    content: "",//评论框的内容
    materialListCount: 7,
    StepListCount: 3,
    MaxShowComment: 2,
    cfBg: false,
    followingCount: 350,
    score: 8.7,
    reading: 15000,
    isFollowing: false,

    /**
     * 传输数据
     */
    _id: "",
    openid: "",

    /**
     * 封面
     */
    cover: "",

    /**
     * 用料数据
     */
    ingredientList: [],

    /**
     * 步骤数据
     */
    stepList: [],

    /**
     * 评论数据
     */
    commentList: [],

    /**
     * 用户数据
     */
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options._id);
    console.log(options.openid);
    this.setData({
      _id: options._id,
      openid: options.openid,
    })
    this.getUserInfo()
    this.getRecipeInfo()
    this.getCommentInfo()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 评论展示
   */
  addMaxShowComment: function(){
    this.MaxShowComment += 2;
  },

  cemojiCfBg: function () {
    this.setData({
      isShow: false,
      cfBg: false
    })
  },

  /**
   * 点击表情显示隐藏表情盒子
   */
  emojiShowHide: function () {
    this.setData({
      isShow: !this.data.isShow,
      isLoad: false,
      cfBg: !this.data.false
    })
  },

  /**
   * 表情选择
   */
  emojiChoose: function (e) {
    //当前输入内容和表情合并
    this.setData({
      content: this.data.content + e.currentTarget.dataset.emoji
    })
  },

  /**
   * 点击emoji背景遮罩隐藏emoji盒子
   */
  cemojiCfBg: function () {
    this.setData({
      isShow: false,
      cfBg: false
    })
  },

  /**
   * 文本域失去焦点时 事件处理
   * @param {inputValue}} e 
   */
  textAreaBlur: function (e) {
    //获取此时文本域值
    console.log(e.detail.value)
    this.setData({
      content: e.detail.value
    })
  },

  /**
   * 解决滑动穿透问题
   * @param {*} e 
   */
  
  emojiScroll: function (e) {
    console.log(e)
  },

  /**
   * 获取菜谱作者信息
   */
  getUserInfo: function () {
    console.log(this.data.openid + "haha");
    console.log(this.data._id + "haha");
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

  /**
   * 获取菜谱信息
   */
  getRecipeInfo: function () {
    console.log(this.data._id);
    wx.cloud.callFunction({
      name: "getRecipeInfo",
      data: {
        _id: this.data._id
      },
      success: res => {
        console.log(res);
        this.setData({
          stepList: res.result.data[0].steps,
          ingredientList: res.result.data[0].ingredients,
          cover: res.result.data[0].cover
        })
      },
      fail: err => {
        console.error(err);
      }
    })
  },

  /**
   * 获取评论信息
   */
  getCommentInfo: function () {
    wx.cloud.callFunction({
      name: "getCommentInfo",
      data: {
        recipe_id: this.data._id
      },
      success: res => {
        console.log(res);
        this.setData({
          commentList: res.result.data
        })
      },
      fail: err => {
        console.error(err);
      }
    })
  },

  /**
   * 发表评论
   */
  send: function () {
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
              wx.cloud.callFunction({
                name: "addCommentInfo",
                data: {
                  recipe_id: this.data._id,
                  name: app.globalData.userInfo.nickName,
                  avatarUrl: app.globalData.userInfo.avatarUrl,
                  comment: this.data.content
                },
                success: res => {
                  console.log(res);
                  // 重新获取评论
                  this.getCommentInfo()
                },
                fail: err => {
                  console.error(err);
                }
              })
            },
            fail: res => {
              console.log("获取用户信息失败", res)
            }
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
  }
})