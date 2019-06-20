// components/header/header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    back: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    height: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back() {
      this.triggerEvent('beforeBack')
    }
  },

  lifetimes: {
    attached() {
      this.setData({
        contentHeight: wx.getMenuButtonBoundingClientRect().height,
        height: wx.getMenuButtonBoundingClientRect().bottom + 5
      })
    }
  }
})
