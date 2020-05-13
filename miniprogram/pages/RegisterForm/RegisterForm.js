// pages/RegisterForm/RegisterForm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    click: false, //是否显示弹窗内容
    option: false, //显示弹窗或关闭弹窗的操作动画
    name: '小明',
    lawName: 'lintiang',
    userId: '458153193511543333',
    type: '北京菜',
    foodId: '40000000000000000000',
    location: '广东省广州市海珠区新港东路1000号',
    fixedPhone: '8801488',
    mobPhone: '12345678901',
    confirmId: 'ssssss',
    introduction: '鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟婂晩鍟',
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
  gotoNotice: function () {
    wx.navigateTo({
      url: '../notice/notice',
    })
  },
  // 用户点击显示弹窗
  clickPup: function() {
    let _that = this;
    if (!_that.data.click) {
      _that.setData({
        click: true,
      })
    }

    if (_that.data.option) {
      _that.setData({
        option: false,
      })

      // 关闭显示弹窗动画的内容，不设置的话会出现：点击任何地方都会出现弹窗，就不是指定位置点击出现弹窗了
      setTimeout(() => {
        _that.setData({
          click: false,
        })
      }, 500)
    } else {
      _that.setData({
        option: true
      })
    }
  },
  getLocation: function(){
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res.address)
        console.log(res.latitude)
        console.log(res.longitude)
        console.log(res.name)
        var location = res.address
        that.setData({
          location: location
        })
      }
    })
  }
})