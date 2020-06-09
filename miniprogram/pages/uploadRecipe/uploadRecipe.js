// miniprogram/pages/uploadRecipe/uploadRecipe.js
const app = getApp()
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
     * 菜名
     */
    name: "",

    /**
     * 食谱简介
     */
    introduction: "",

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
     * 小贴士
     */
    tip: "",

    /**
     * 标签
     */
    tags: [],

    /**
     * 控制局部页面
     */
    temp1: 1,
    temp2: 1,

    /**
     * 菜谱数量
     * 用来确定图片存放位置
     */
    index: 0,

    /**
     * 下拉框数据
     */
    show: false,
    reply: false,//控制下拉列表的显示隐藏，false隐藏、true显示

    /**
     * 标签控制
     */
    showA: true,
    showB: false,
    showC: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserRecipeIndex()
  },

  /**
   * 获取菜谱数量
   */
  getUserRecipeIndex: function () {
    wx.cloud.callFunction({
      name: "getUserRecipeInfo",
      data: {
        openid: app.globalData.openid
      },
      success: res => {
        this.setData({
          index: res.result.data.length
        })
      },
      fail: err => {
        console.error(err);
      }
    })
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
          cloudPath: app.globalData.openid + "/" + this.data.index + "/" + "cover.png",
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
   * 更改步骤内容
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
        const tempFilePaths = res.tempFilePaths
        array[index][tag] = tempFilePaths    
        this.setData({
          steps: array
        })
        //将照片上传至云端需要刚才存储的临时地址
        wx.cloud.uploadFile({
          cloudPath: app.globalData.openid + "/" + this.data.index + "/" + index + "/" + "step.png",
          filePath: tempFilePaths[0],
          success(res) {
            //上传成功后会返回永久地址
            console.log(res.fileID);
            array[index][tag] = res.fileID
            this.setData({
              steps: array
            })
          }
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
  },

  /**
   * 上传菜谱
   */
  uploadRecipe: function () {
    wx.cloud.callFunction({
      name: "addRecipeInfo",
      data: {
        chef: app.globalData.userInfo.nickName,
        openid: app.globalData.openid,
        ingredients: this.data.ingredients,
        introduction: this.data.introduction,
        name: this.data.name,
        steps: this.data.steps,
        tip: this.data.tip,
        tags: this.data.tags
      },
      success: res => {
        console.log(res);
        console.log("上传成功");
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
  },

  /**
   * 
   */
  selectTap(){
    this.setData({
      show: !this.data.show,
      reply: !this.data.reply
    });
  },

  /**
   * 点击下拉列表
   * @param {*} e 
   */
  optionTap(){
    this.setData({
      show: !this.data.show
    });
  },

  toA: function () {
    this.setData({
      showA: true,
      showB: false,
      showC: false
    })
  },

  toB: function () {
    this.setData({
      showA: false,
      showB: true,
      showC: false
    })
  },
  
  toC: function () {
    this.setData({
      showA: false,
      showB: false,
      showC: true
    })
  },

  addTag: function (e) {
    let tag = e.target.dataset.tag
    let tags = this.data.tags
    if (tags.length == 2) {
      console.log("不得多于两个");
    } else {
      tags.push(tag)
      this.setData({
        tags: tags
      })
    }
  }
})