// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const $ = db.command.aggregate
  return await db.collection('restaurants').aggregate()
    .geoNear({
      distanceField: 'distance', // 输出的每个记录中 distance 即是与给定点的距离
      spherical: true,
      near: db.Geo.Point(event.longitude, event.latitude), 
      query: {
        docType: 'geoNear',
      },
      key: 'location', // 若只有 location 一个地理位置索引的字段，则不需填
      includeLocs: 'location', // 若只有 location 一个是地理位置，则不需填
    })
    .end()
}