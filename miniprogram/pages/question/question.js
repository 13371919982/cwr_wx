// pages/question/question.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key: '',
    questionList: [],
    current: 1, // 当前第几题
    // 倒计时
    m: 15,
    s: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData(options)

    // 请求题目
    wx.cloud.callFunction({
      name: 'getQuestion',
      success: res => {
        this.setData({
          questionList: res.result.ans.data
        })
      }
    })

    // 答题开始提示界面
    // 处理答题倒计时
    this.data.timer = setInterval(() => this.handleTimeLimit(), 1000)
  },

  // 返回提示 
  confirm() {
    wx.showModal({
      title: '返回后答题记录消失',
      content: '确认返回?',
      success: res => {
        if (res.confirm) {
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },

  // 倒计时
  handleTimeLimit() {
    if (this.data.m === 0 && this.data.s === 0) {
      // 清除倒计时
      clearInterval(this.data.timer)
      wx.showModal({
        title: '时间到了,请提交答案',
        content: '点击取消,结果会消失',
        success: res => {
          if (res.confirm) {
            // 整理答案 提交答案 跳转到上一个页面
            wx.navigateBack({
              detla: 1
            })
          }
        }
      })
      return
    }
    this.data.s--
      if (this.data.s < 0) {
        this.data.m--
          this.data.s = 59
      }
    this.setData({
      m: this.data.m,
      s: this.data.s
    })
  },

  // 滑动切换题目处理
  change(e) {
    if (e.detail.current === this.data.questionList.length) return
    this.setData({
      current: e.detail.current++
    })
  },

  // 下一题
  next() {
    if (this.data.current === this.data.questionList.length) return
    this.setData({
      current: this.data.current+1
    })
  },

  // 上一题
  prev() {
    if (this.data.current === 1) return
    this.setData({
      current: this.data.current-1
    })
  }
})