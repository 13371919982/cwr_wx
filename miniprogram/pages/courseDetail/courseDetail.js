// pages/courseDetail/courseDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseId: '',
    courseInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(options)
    this.getClassId(this.data.courseId).then(classId => {
      const courseListUrl = `https://open.shiguangkey.com/api/m/course/chapter?terminalType=5&imei=a1e12cf2-c691-4c0a-3d39-a9f274a71696&courseId=${ this.data.courseId }&classId=${ classId }&pageNo=3&teachingMethod=8010&pageSize=40&type=3`
      wx.request({
        url: courseListUrl,
        success: res => {
          this.setData({
            courseInfo: res.data.data
          })
        }
      })
    })
  },
  getClassId(courseId) {
    const classIdUrl = `https://open.shiguangkey.com/api/m/course/listClass?terminalType=5&imei=a1e12cf2-c691-4c0a-3d39-a9f274a71696&courseId=${courseId}`
    return new Promise((resolve,reject) => {
      wx.request({
        url: classIdUrl,
        success: res => {
          const classId = res.data.data[0].classId
          resolve(classId)
        }
      })
    })
  }
})