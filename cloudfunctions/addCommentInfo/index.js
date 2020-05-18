// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('comments').add({
      data: {
        recipe_id: event.recipe_id,
        name: event.name,
        avatarUrl: event.avatarUrl,
        comment: event.comment,
        date: new Date()
      }
    })
  }
  catch (err) {
    console.error(err);
  }
}