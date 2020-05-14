// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('users').add({
      data: {
        openid: event.openid,
        nickname: event.nickname,
        avatarUrl: event.avatarUrl,
        fans: 0,
        praises: 0,
        introduction: "",
        collections: [],
        focus: [],
        recipes: [],
        date: new Date()
      }
    })
  }
  catch(err) {
    console.error(err);
  }
}