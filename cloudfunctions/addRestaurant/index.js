// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('restaurants').add({
      data: {
        openid: event.openid,
        nickName: event.nickName,
        cover: event.cover,
        name: event.name,
        lawName: event.lawName,
        userId: event.userId,
        type: event.type,
        foodId: event.foodId,
        address: event.address,
        location: db.Geo.Point(event.longitude, event.latitude),
        fixedPhone: event.fixedPhone,
        mobPhone: event.mobPhone,
        confirmId: event.confirmId,
        introduction: event.introduction,
      }
    })
  }
  catch(err) {
    console.error(err);
  }

}