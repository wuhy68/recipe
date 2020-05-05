// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('recipes').add({
      data: {
        chef: event.chef,
        ingredients: event.ingredients,
        introduction: event.introduction,
        name: event.name,
        praise: 0,
        steps: event.steps,
        type: event.type,
        date: new Date()
      }
    })
  }
  catch(err) {
    console.error(err);
  }

}