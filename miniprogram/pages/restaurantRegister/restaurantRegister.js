// miniprogram/pages/restaurantRegister/restaurantRegister.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 控制弹窗动画
     */
    click: false, //是否显示弹窗内容
    option: false, //显示弹窗或关闭弹窗的操作动画

    /**
     * 表单数据
     */
    name: "",
    lawName: "",
    userId: "",
    type: "",
    foodId: "",
    address: "",
    fixedPhone: "",
    mobPhone: "",
    confirmId: "",
    introduction: "",

    /**
     * 位置信息
     */
    latitude: 0,
    longitude: 0,

    /**
     * 封面
     */
    cover: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  
  /**
   * 上传封面图片
   * 获得临时地址
   */
  uploadCover: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      complete: (res) => {
        //选择完成会先返回一个临时地址保存备用
        const tempFilePaths = res.tempFilePaths
        this.setData({
          cover: tempFilePaths
        })
        //将照片上传至云端需要刚才存储的临时地址
        wx.cloud.uploadFile({
          cloudPath: app.globalData.openid + "/" + "restaurant" + "/" + "cover.png",
          filePath: tempFilePaths[0],
          success(res) {
            //上传成功后会返回永久地址
            console.log(res.fileID);
            this.setData({
              cover: res.fileID
            })
          }
        })    
        console.log(this.data.cover);
      },
    })
  },

  /**
   * 前往用户协议
   */
  toNotice: function () {
    wx.navigateTo({
      url: '../notice/notice',
    })
  },
  
  /**
   * 弹窗操作
   */
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

  /**
   * 获取位置信息
   */
  getLocation: function(){
    var that = this
    wx.chooseLocation({
      success: res => {
        that.setData({
          address: res.address,
          latitude: res.latitude,
          longitude: res.longitude
        })
        console.log(this.data.address)
        console.log(this.data.latitude)
        console.log(this.data.longitude)
      }
    })
  },

  formSubmit: function (e) {
    this.setData({
      name: e.detail.value.name,
      lawName: e.detail.value.lawName,
      userId: e.detail.value.userId,
      type: e.detail.value.type,
      foodId: e.detail.value.foodId,
      address: e.detail.value.address,
      fixedPhone: e.detail.value.fixedPhone,
      mobPhone: e.detail.value.mobPhone,
      confirmId: e.detail.value.confirmId,
      introduction: e.detail.value.introduction,
    })
    console.log(this.data);
    
  },

  uploadRestaurant: function () {
    wx.cloud.callFunction({
      name: "addRestaurant",
      data: {
        openid: app.globalData.openid,
        nickName: app.globalData.userInfo.nickName,
        cover: this.data.cover,
        name: this.data.name,
        lawName: this.data.lawName,
        userId: this.data.userId,
        type: this.data.type,
        foodId: this.data.foodId,
        address: this.data.address,
        longitude: this.data.longitude,
        latitude: this.data.latitude,
        fixedPhone: this.data.fixedPhone,
        mobPhone: this.data.mobPhone,
        confirmId: this.data.confirmId,
        introduction: this.data.introduction,
      },
      success: res => {
        console.log(res);
        console.log("餐厅创建成功");
      },
      fail: err => {
        console.error(err);
      }
    })
    wx.navigateBack({
      complete: (res) => {
        console.log(res)
      },
    })
  }
})