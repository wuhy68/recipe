// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('recipes').add({
      data: {
        cover: event.cover,
        chef: event.chef,
        openid: event.openid,
        ingredients: event.ingredients,
        introduction: event.introduction,
        name: event.name,
        praise: [],
        steps: event.steps,
        tip: event.tip,
        tags: event.tags,
        reading: 0,
        date: new Date()
      }
    })
  }
  catch(err) {
    console.error(err);
  }

}