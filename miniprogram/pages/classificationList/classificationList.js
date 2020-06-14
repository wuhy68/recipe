// miniprogram/pages/classificationList/classificationList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['../../image/indexImage1.jpg', '../../image/indexImage2.jpg', '../../image/indexImage3.png'],
    indicatorDots: true,
    vertical: true,
    autoplay: true,
    interval: 2000,
    duration: 800,
    PictureComCount: 4,
    List:[{id:'家常菜',name:'家庭日常制作食用的菜肴'},{id:'下饭菜',name:'每餐辅餐以开胃，既饱食欲，更解思乡之苦'},{id:'烘焙',name:'是面包、蛋糕类产品制作不可缺少的步骤'},{id:'肉类',name:'大口享受鲜美的肉类吧'},{id:'早餐',name:'早餐可关系着一个人一天的精神'},{id:'蔬菜',name:'蔬菜蕴含丰富的维生素，对人体也很有用哟'},{id:'汤粥主食',name:'汤粥能让人更加的开胃'},{id:'快手菜',name:'制作方便迅速'},{id:'素菜',name:'肉吃多了，就来点素吧'},{id:'甜品饮品',name:'甜甜的美食更容易让人开心哟'},{id:'小吃',name:'闲暇之余，来点好吃的吧'},{id:'零食',name:'谁不想吃零食呢'},{id:'懒人菜谱',name:'懒人特用'},{id:'沙拉凉菜',name:'尝试下冰凉的美食吧'},{id:'单人份',name:'即便只有一人，也得好好吃饭'},{id:'宴请',name:'向客人们展示你的手艺吧'},{id:'下午茶',name:'来和朋友吃一顿下午茶吧'},{id:'便当',name:'试试自己做做便当吧'}],
    /**
     * 传输数据
     */
    tag: [],
    tagRecipes:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tag = []
    tag.push(options.tag)
    this.setData({
      tag: tag
    })
    console.log(tag);
    
    this.getTagRecipe()
  },

  /**
   * 获取对应tag的recipe
   */
  getTagRecipe: function () {
    wx.cloud.callFunction({
      name: "getTypeRecipeInfo",
      data: {
        tag: this.data.tag
      },
      success: res => {
        console.log(res);
        this.setData({
          tagRecipes: res.result.data
        })
      },
      fail: err => {
        console.error(err);
      }
    })
  }
})