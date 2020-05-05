// miniprogram/pages/uploadRecipe/uploadRecipe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 封面图片
     */
    cover: "",

    /**
     * 配料
     * 初始为两组空配料组合
     * @member {配料} food
     * @member {对应数量} count
     */
    ingredients: [{
      food: "",
      count: ""
    }, {
      food: "",
      count: ""
    }],

    /**
     * 步骤
     * 初始为两组空步骤组合
     * @member {图片地址} picture
     * @member {步骤} step
     */
    steps: [{
      picture: "",
      step: ""
    }, {
      picture: "",
      step: ""
    }],

    /**
     * 控制局部页面
     */
    temp1: 1,
    temp2: 1
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
        this.setData({
          cover: res.tempFilePaths
        })
      },
    })
  },

  /**
   * 设置配料内容
   */
  setIngredientsValue: function (e) {
    let index = e.target.dataset.index
    let tag = e.target.dataset.tag
    let array = this.data.ingredients
    array[index][tag] = e.detail.value
    this.setData({
      ingredients: array
    })
  },

  /**
   * 更改配料内容
   * @param {dataset} e 
   */
  setStepsValue: function (e) {
    let index = e.target.dataset.index
    let tag = e.target.dataset.tag
    let array = this.data.steps
    array[index][tag] = e.detail.value
    this.setData({
      steps: array
    })
  },

  /**
   * 添加配料内容
   */
  addIngredient: function () {
    const newIngredient = {
      food: "",
      count: ""
    }
    this.setData({
      ingredients: this.data.ingredients.concat(newIngredient)
    })
  },

    /**
   * 删除配料内容
   * @param {dataset} e 
   */
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

  /**
   * 添加步骤内容
   */
  addStep: function () {
    const newStep = {
      picture: "",
      step: ""
    }
    this.setData({
      steps: this.data.steps.concat(newStep)
    })
  },

  /**
   * 上传步骤图片
   * @param {dataset} e 
   */
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

  /**
   * 删除相应步骤
   * @param {dataset} e 
   */
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

  /**
   * 控制修改配料内容
   */
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

  /**
   * 控制修改步骤内容
   */
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