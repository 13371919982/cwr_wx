// components/recommend/recommend.js
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
    selectList: [],
    swiperList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转到搜索
    jumpToSearch() {
      wx.navigateTo({
        url: '/pages/search/search',
      })
    },

    // 搜索
    search(e) {
      const kwords = e.currentTarget.dataset.kwords
      wx.navigateTo({
        url: `/pages/search/search?kwords=${ kwords }`
      })
    }
  },

  lifetimes: {
    attached() {
      // 分类选择
      const selectUrl = 'https://open.shiguangkey.com/api/m/index/findCourseLikeName?terminalType=5&imei=894df9bb-7d4d-9107-2ba6-365d51d0505f&list=3232235629&intranetIp=3232235629&courseName=we&pageIndex=0&pageSize=10'
      wx.request({
        url: selectUrl,
        success: res => {
          this.setData({
            selectList: res.data.data.keyboard
          })
        }
      })

      // 轮播图

      const swiperUrl = 'https://open.shiguangkey.com/api/m/index/listBanner?terminalType=5&imei=894df9bb-7d4d-9107-2ba6-365d51d0505f&list=3232235629&intranetIp=3232235629'
      wx.request({
        url: swiperUrl,
        success: res => {
          this.setData({
            swiperList: res.data.data
          })
        }
      })
    }
  }
})
