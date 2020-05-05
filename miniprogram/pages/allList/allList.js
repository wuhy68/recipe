// miniprogram/pages/allList/all.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 选择搜索内容
     */
    start:"地域",
    llist:[{id:1,name:"北京"},
          {id:1,name:"上海"},
          {id:1,name:"天津"},
          {id:1,name:"重庆"},
          {id:1,name:"广东"},
          {id:1,name:"广西"},
          {id:1,name:"云南"},
          {id:1,name:"江西"},
          {id:1,name:"福建"},
          {id:1,name:"四川"},
          {id:1,name:"湖南"},
          {id:1,name:"湖北"},
          {id:1,name:"浙江"},
          {id:1,name:"江苏"},
          {id:1,name:"西藏"},
          {id:1,name:"甘肃"},
          {id:1,name:"青海"},
          {id:1,name:"贵州"},
          {id:1,name:"河南"},
          {id:1,name:"河北"},
          {id:1,name:"内蒙古"},
          {id:1,name:"新疆"},
          {id:1,name:"吉林"},
          {id:1,name:"黑龙江"},
          {id:1,name:"辽宁"},
    ],
    isstart:false
  },

  opens: function (e) {
        switch (e.currentTarget.dataset.item) {
            case "1":
                if (this.data.isstart) {
                    this.setData({
                        isstart: false,
                    })
                }
                else {
                    this.setData({
                        isstart: true,
                    })
                }
                break
        }
    },

    onclicks1: function (e) {
        var index = e.currentTarget.dataset.index;
        let name = this.data.llist[index].name;
        this.setData({
            isstart: false,
            isfinish: false,
            isdates: false,
            start: name
        })
    },

    /**
     * 查询函数
     * @param {dataset} e 
     */
    find: function(e){
        var index = e.currentTarget.dataset.index;
        let name = this.data.llist[index].name;
    },

    gotoZone:function() {
        url:''
    },

    gotoFood: function() {
        url: ''
    },

    gotoRestaurant: function(){
        url: ''
    },

    upper: function(){

    },

    lower: function(){

    }
})