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

    /**
     * 评论框控制
     */
    isHide: false,

    /**
     * 关注,收藏，点赞
     */
    isFollowing: false,
    isFocus: false,
    isPraise: false,
    isCommentPraise: false,
    agree: [],

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
     * 阅读数据
     */
    reading: 0,

    /**
     * 评论数据
     */
    commentList: [],

    /**
     * 点赞数据
     */
    praise: [],

    /**
     * 用户数据
     */
    userInfo: {},
    currentUserInfo: {}
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
    this.getCurrentUserInfo()
    this.addReading()
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

  /**
   * 
   * @param {*} e 
   */
  textAreaFocus: function () {
    this.setData({
      isHide: true
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
    this.setData({
      isHide: false
    })
  },

  /**
   * 获取当前用户
   */
  getCurrentUserInfo: function () {
    wx.cloud.callFunction({
      name: "getUserInfo",
      data: {
        openid: app.globalData.openid
      },
      success: res => {
        console.log(res);
        this.setData({
          currentUserInfo: res.result.data[0]
        })
        console.log(this.data.currentUserInfo);
        // 获取当前用户是否关注
        let flag = this.data.currentUserInfo.focus.indexOf(this.data.openid)
        console.log(flag);
        if (flag == -1) {
          this.setData({
            isFocus: false
          })
        } else {
          this.setData({
            isFocus: true
          })
        }

        // 获取当前用户是否收藏
        flag = this.data.currentUserInfo.collections.indexOf(this.data._id)
        console.log(flag);
        if (flag == -1) {
          this.setData({
            isFollowing: false
          })
        } else {
          this.setData({
            isFollowing: true
          })
        }
      },
      fail: err => {
        console.error(err);
      }
    })
  },

  /**
   * 获取菜谱作者信息
   */
  getUserInfo: function () {
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
          cover: res.result.data[0].cover,
          praise: res.result.data[0].praise,
          reading: res.result.data[0].reading
        })
        let flag = this.data.praise.indexOf(app.globalData.openid)
        if (flag == -1) {
          this.setData({
            isPraise: false
          })
        } else {
          this.setData({
            isPraise: true
          })
        }
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
        let agree = []
        for (let i = 0; i < this.data.commentList.length; i++) {
          if (this.data.commentList[i].agree.indexOf(app.globalData.openid) == -1) {
            agree[i] = false
          } else {
            agree[i] = true
          }
        }
        this.setData({
          agree: agree
        })
      },
      fail: err => {
        console.error(err);
      }
    })
  },

  /**
   * 添加关注
   */
  addFocus: function () {
    let focus = this.data.currentUserInfo.focus
    focus.push(this.data.openid)
    wx.cloud.callFunction({
      name: "updateUserInfo",
      data: {
        openid: app.globalData.openid,
        focus: focus
      },
      success: res => {
        console.log(res);
        console.log("关注成功");
        this.setData({
          isFocus: true
        })
        this.getCurrentUserInfo()
      },
      fail: err => {
        console.error(err);
      }
    })
    let fans = this.data.userInfo.fans
    fans.push(app.globalData.openid)
    wx.cloud.callFunction({
      name: "updateUserInfo",
      data: {
        openid: this.data.openid,
        fans: fans
      },
      success: res => {
        console.log(res);
        this.getUserInfo();
      },
      fail: err => {
        console.error(err);
      }
    })
  },

  /**
   * 取消关注
   */
  deleteFocus: function () {
    let focus = []
    for (let i = 0; i < this.data.currentUserInfo.focus.length; i++) {
      if (this.data.currentUserInfo.focus[i] != this.data.openid) {
        focus.push(this.data.currentUserInfo.focus[i])
      }
    }
    
    wx.cloud.callFunction({
      name: "updateUserInfo",
      data: {
        openid: app.globalData.openid,
        focus: focus
      },
      success: res => {
        console.log(res);
        console.log("取消关注");
        this.setData({
          isFocus: false
        })
        this.getCurrentUserInfo()
      },
      fail: err => {
        console.error(err);
      }
    })
    let fans = []
    for (let i = 0; i < this.data.userInfo.fans.length; i++) {
      if (this.data.userInfo.fans[i] != app.globalData.openid) {
        fans.push(this.data.userInfo.fans[i])
      }
    }
    wx.cloud.callFunction({
      name: "updateUserInfo",
      data: {
        openid: this.data.openid,
        fans: fans
      },
      success: res => {
        console.log(res);
        this.getUserInfo();
      },
      fail: err => {
        console.error(err);
      }
    })
  },

  /**
   * 添加收藏
   */
  addCollection: function () {
    let collections = this.data.currentUserInfo.collections
    collections.push(this.data._id)
    wx.cloud.callFunction({
      name: "updateUserInfo",
      data: {
        openid: app.globalData.openid,
        collections: collections
      },
      success: res => {
        console.log(res);
        console.log("收藏成功");
        this.setData({
          isFollowing: true,
        })
      },
      fail: err => {
        console.error(err);
      }
    })
  },

  /**
   * 取消收藏
   */
  deleteColletion: function () {
    let collections = []
    for (let i = 0; i < this.data.currentUserInfo.collections.length; i++) {
      if (this.data.currentUserInfo.collections[i] != this.data._id) {
        focus.push(this.data.currentUserInfo.collections[i])
      }
    }
    wx.cloud.callFunction({
      name: "updateUserInfo",
      data: {
        openid: app.globalData.openid,
        collections: collections
      },
      success: res => {
        console.log(res);
        console.log("取消收藏");
        this.setData({
          isFollowing: false
        })
      },
      fail: err => {
        console.error(err);
      }
    })
  },

  /**
   * 点赞
   */
  addPraise: function () {
    let praise = this.data.praise
    praise.push(app.globalData.openid)
    wx.cloud.callFunction({
      name: "updateRecipeInfo",
      data: {
        _id: this.data._id,
        praise: praise
      },
      success: res => {
        console.log(res);
        console.log("点赞成功");
        this.setData({
          isPraise: true
        })
      },
      fail: err => {
        console.error(err);
      }
    })
  },


  /**
   * 取消点赞
   */
  deletePraise: function () {
    let praise = []
    for (let i = 0; i < this.data.praise.length; i++) {
      if (this.data.praise[i] != app.globalData.openid) {
        praise.push(this.data.praise[i])
      }
    }
    wx.cloud.callFunction({
      name: "updateRecipeInfo",
      data: {
        _id: this.data._id,
        praise: praise
      },
      success: res => {
        console.log(res);
        console.log("取消点赞");
        this.setData({
          isPraise: false
        })
      },
      fail: err => {
        console.error(err);
      }
    })
  },

  /**
   * 点赞评论
   */
  addCommentAgree: function (e) {
    let agree = []
    let _id = e.target.dataset.comment_id
    for (let i = 0; i < this.data.commentList.length; i++) {
      if (this.data.commentList[i]._id == e.target.dataset.comment_id) {
        agree = this.data.commentList[i].agree
      }
    }
    agree.push(app.globalData.openid)
    console.log(agree);
    
    wx.cloud.callFunction({
      name: "updateCommentInfo",
      data: {
        _id: _id,
        agree: agree
      },
      success: res => {
        console.log(res);
        console.log("评论点赞成功");
        let agree = this.data.agree
        for (let i = 0; i < this.data.commentList.length; i++) {
          if (this.data.commentList[i]._id == e.target.dataset.comment_id) {
            agree[i] = true
          }
        }
        this.setData({
          agree: agree
        })
        this.getCommentInfo()
      },
      fail: err => {
        console.error(err);
      }
    })
    
  },

  /**
   * 删除评论点赞
   */
  deleteCommentAgree: function (e) {
    let temp = []
    let agree = []
    for (let i = 0; i < this.data.commentList.length; i++) {
      if (this.data.commentList[i]._id == e.target.dataset.comment_id) {
        temp = this.data.commentList[i].agree
      }
    }

    for (let i = 0; i < temp.length; i++) {
      if (temp[i] != app.globalData.openid) {
        agree.push(temp[i])
      }
    }

    wx.cloud.callFunction({
      name: "updateCommentInfo",
      data: {
        _id: e.target.dataset.comment_id,
        agree: agree
      },
      success: res => {
        console.log(res);
        console.log("取消评论点赞");
        let agree = this.data.agree
        for (let i = 0; i < this.data.commentList.length; i++) {
          if (this.data.commentList[i]._id == e.target.dataset.comment_id) {
            agree[i] = false
          }
        }
        this.setData({
          agree: agree
        })
        this.getCommentInfo()
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
                  openid: app.globalData.openid,
                  comment: this.data.content
                },
                success: res => {
                  console.log(res);
                  // 重新获取评论
                  this.getCommentInfo()
                  this.setData({
                    content: ""
                  })
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
  },

  /**
   * 添加阅读量
   */
  addReading: function () {
    let reading = this.data.reading + 1;
    wx.cloud.callFunction({
      name: "updateRecipeInfo",
      data: {
        _id: this.data._id,
        reading: reading
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