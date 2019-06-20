// components/recommend/courselist/courselist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    courses: []
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  lifetimes: {
    attached() {
      let promiseList = []
      for(let i = 1; i < 5; i++) {
        const url = `https://open.shiguangkey.com/api/m/index/search?terminalType=5&imei=894df9bb-7d4d-9107-2ba6-365d51d0505f&list=3232235629&intranetIp=3232235629&courseName=web&courseType=0&pageNo=${ i }&pageSize=4&onlyFree=0`
        promiseList.push(new Promise((resolve) => {
          wx.request({
            url,
            success: res => {
              resolve(res.data.data.courses)
            }
          })
        }))
      }
      Promise.all(promiseList).then(res => {
        this.setData({ 
          courses: res
        })
      })
    }
  }
})