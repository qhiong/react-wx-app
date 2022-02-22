// components/waterFall/waterFall.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataSource: Array,
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    eventToDetail(event){
      this.triggerEvent("eventToDetail",{id:event.detail.id})
    }
  },
  lifetimes: {
    attached: function () {
      
    }
  },
})