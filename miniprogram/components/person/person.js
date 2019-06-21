// components/person/person.js
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
    nickName: '未登录',
    headSrc: '../../static/icon/man.png',
    isLogin: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    upload() {
      wx.navigateTo({
        url: '/pages/upload/upload'
      })
    },

    // 点击登录
    login(e) {
      this.setData({
        nickName: e.detail.userInfo.nickName,
        headSrc: e.detail.userInfo.avatarUrl,
        isLogin: true
      })
    },

    // 跳转到用户信息修改页面
    setUserInfo() {
      // wx.navigateTo({
      //   url: '',
      // })
    }
  },


  lifetimes: {
    attached() {
      // 假如已经登录过了,直接加载到页面中
      wx.getUserInfo({
        success: res => {
          const { nickName, avatarUrl } = res.userInfo
          this.setData({
            nickName: nickName,
            headSrc: avatarUrl,
            isLogin: true
          })
        }
      })
    }
  }
})
