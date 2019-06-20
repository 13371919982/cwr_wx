// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const questionCollection = db.collection('question')
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  console.log(event)
  // 将event 存储到数据库中
  let result = await questionCollection.add({
    data: event
  })
  return {
    result
  }
}