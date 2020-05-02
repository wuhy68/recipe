// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('recipes').add({
      data: {
        chef: chef,
        ingredients: ingredients,
        introduction: introduction,
        name: name,
        praise: 0,
        steps: steps,
        type: type,
        date: new Date()
      }
    })
  }
  catch(err) {
    console.error(err);
  }

}