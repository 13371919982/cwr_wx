Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selection: Array,
    key: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    mySelection: []
  },

  // 处理父组件的传来的值
  lifetimes: {
    attached() {
      this.setData({
        mySelection: this.data.selection.map(item => item.value)
      })
    }
  },
  
  observers: {
    'selection'() {
      this.setData({
        mySelection: this.data.selection.map(item => item.value)
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 将选中的值传出去
    change(e) {
      const index = e.detail.value
      this.triggerEvent('change', this.data.selection[index])
    }
  }
})
