//index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 'recommend', // 全局控制当前显示的是哪个页面
    publicTitle: 'CWR web前端',
    tabbarList: [
      {
        title: '推荐',
        content: 'recommend',
        pageTitle: 'CWR web前端',
        path: '../../static/icon/recommend.png', // 图片地址
        activePath: '../../static/icon/recommend1.png' // 活动图片地址
      }, {
        title: '答题',
        pageTitle: '答题系统',
        content: 'message',
        path: '../../static/icon/message.png',
        activePath: '../../static/icon/message1.png'
      }, {
        title: '个人',
        pageTitle: '个人信息',
        content: 'person',
        path: '../../static/icon/person.png',
        activePath: '../../static/icon/person1.png'
      }
    ],
    // 全局的头部高度
    headerHeight: wx.getMenuButtonBoundingClientRect().bottom + 5,
    current: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  // tabbar 点击切换
  handlechange(e) {
    const current = this.data.tabbarList.findIndex(item => item.content === e.detail.content)
    this.setData({
      current,
      currentPage: e.detail.content,
      publicTitle: this.data.tabbarList[current].pageTitle
    })
  },

  // 主体内容滑动切换
  swiperchange(e){
    const current = e.detail.current
    this.setData({
      current,
      currentPage: this.data.tabbarList[current].content,
      publicTitle: this.data.tabbarList[current].pageTitle
    })
  }
})
