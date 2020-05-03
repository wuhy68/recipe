// miniprogram/pages/uploadRecipe/uploadRecipe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cover: "",
    ingredients: [{
      food: "",
      count: ""
    }, {
      food: "",
      count: ""
    }],
    steps: [{
      picture: "",
      step: ""
    }, {
      picture: "",
      step: ""
    }],
    temp1: 1,
    temp2: 1
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

  uploadCover: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      complete: (res) => {
        this.setData({
          cover: res.tempFilePaths
        })
      },
    })
  },

  uploadPicture: function (e) {
    let index = e.currentTarget.dataset.index
    let tag = e.currentTarget.dataset.tag
    let array = this.data.steps
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      complete: (res) => {
        array[index][tag] = res.tempFilePaths    
        this.setData({
          steps: array
        })
      }
    })

  },

  setIngredientsValue: function (e) {
    let index = e.target.dataset.index
    let tag = e.target.dataset.tag
    let array = this.data.ingredients
    array[index][tag] = e.detail.value
    this.setData({
      ingredients: array
    })
  },

  setStepsValue: function (e) {
    let index = e.target.dataset.index
    let tag = e.target.dataset.tag
    let array = this.data.steps
    array[index][tag] = e.detail.value
    this.setData({
      steps: array
    })
  },

  addIngredient: function () {
    const newIngredient = {
      food: "",
      count: ""
    }
    this.setData({
      ingredients: this.data.ingredients.concat(newIngredient)
    })
  },

  addStep: function () {
    const newStep = {
      picture: "",
      step: ""
    }
    this.setData({
      steps: this.data.steps.concat(newStep)
    })
  },

  deleteIngredient: function (e) {
    let index = e.target.dataset.index
    let length = this.data.ingredients.length
    let array = []
    if (length > 1) {
      for (let i = 0; i < length; i++) {
        if (i != index) {
          array.push(this.data.ingredients[i])
        }
      }
      this.setData({
        ingredients: array
      })
    }
  },

  deleteStep: function (e) {
    let index = e.target.dataset.index
    let length = this.data.steps.length
    let array = []
    if (length > 2) {
      for (let i = 0; i < length; i++) {
        if (i != index) {
          array.push(this.data.steps[i])
        }
      }
      this.setData({
        steps: array
      })
    }
  },

  changeTemp1: function () {
    if (this.data.temp1 == 1) {
      this.setData({
        temp1: 0
      })
    } else {
      this.setData({
        temp1: 1
      })
    }
  },

  changeTemp2: function () {
    if (this.data.temp2 == 1) {
      this.setData({
        temp2: 0
      })
    } else {
      this.setData({
        temp2: 1
      })
    }
  }
})