// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('comments').where({
      _id: event._id
    }).update({
      data: {
        agree: event.agree
      }
    })
  }
  catch (err) {
    console.error(err);
  }
}