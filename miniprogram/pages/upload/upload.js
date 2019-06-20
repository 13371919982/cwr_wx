// pages/upload/upload.js

// 题目的数据结构
// const problem = {
//   description: 'What is the result of this expression? (or multiple ones)',
//   code: `["1", "2", "3"].map(parseInt)`,
//   selection: [
//     // 若干个
//     {
//       value: `["1", "2", "3"]`,
//       num: 'A'
//     }
//   ],
//   description: '',
//   code: '',
//   ans: ''
// }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selection: [
      {
        index: 0,
        value: `["1", "2", "3"]`
      }, {
        index: 1,
        value: `[1, 2, 3]`
      }, {
        index: 2,
        value: `[0, 1, 2]`
      }, {
        index: 3,
        value: 'other'
      }
    ],
    description: `What is the result of this expression? (or multiple ones)`,
    code: `["1", "2", "3"].map(parseInt)`,
    ans: `{
      index: 3,
      value: 'other'
    }`
  },

  // 答案设置选项  choose的数据更新
  chooseInput(e) {
    const index = e.currentTarget.dataset.index
    const value = e.detail.value
    this.data.selection[index].value = value

    // 需要setData
    this.setData({
      selection: this.data.selection
    })
  },

  // 增加答案条目
  add() {
    if(this.data.selection.length > 3) {
      return
    }
    this.data.selection.push({
      index: this.data.selection.length,
      value: ''
    })
    this.setData({
      selection: this.data.selection
    })
  },

  // 题目描述
  descriptionInput(e) {
    this.setData({
      description: e.detail.value
    })
  },

  // 具体代码
  codeInput(e) {
    this.setData({
      code: e.detail.value
    })
  },

  // 处理选中的正确答案
  handleChange(e) {
    this.setData({
      ans: e.detail
    })
  },

  // 题目录入
  submit() {
    // 判断题目描述不能为空
    if(!this.data.description) {
      wx.showToast({
        title: '题目描述不能为空!',
        icon: 'none'
      })
      return
    }
    // 判断具体代码不能为空
    if (!this.data.code) {
      wx.showToast({
        title: '具体代码不能为空!',
        icon: 'none'
      })
      return
    }
    // 判断答案选项不能为空
    if (this.data.selection.some(item => !item.value)){
      wx.showToast({
        title: '答案选项不全(至少两个)',
        icon: 'none'
      })
      return
    }
    // 判断正确答案不能为空
    if(!this.data.ans.value){
      wx.showToast({
        title: '请选择一个正确答案',
        icon: 'none'
      })
      return
    }

    // 提交 上传到云函数 后台
    wx.cloud.callFunction({
      name: 'uploadQuestion',
      data: this.data,
      success: res => {
        console.log(res)
      }
    })
  },

  // 返回提示
  confirm() {
    wx.showModal({
      title: '尚有内容编辑完成',
      content: '确认返回?',
      success: res => {
        if(res.confirm) {
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  }
})