// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('users').where({
      openid: event.openid
    }).update({
      data: {
        fans: event.fans,
        praises: event.praises,
        introduction: event.introduction,
        collections: event.collections,
        focus: event.focus,
        history: event.history
      }
    })
  }
  catch (err) {
    console.error(err);
  }
}