// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('comments').where({
      recipe_id: event.recipe_id,
      _id: event._id
    }).update({
      data: {
        reply: {
          name: _.push(event.name),
          comment: _.push(event.reply)
        }
      }
    })
  }
  catch (err) {
    console.error(err);
  }
}