// components/tabbar/tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentPage: String,
    tabbarList: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentPage: 'recommend'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    change(e) {
      this.triggerEvent('change', e.currentTarget.dataset)
    }
  }
})
