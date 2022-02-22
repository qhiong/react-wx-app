// components/classifyListItem/classifyListItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    List:Array
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
    // 点击事件 传输给父组件对应id 为参数 发送请求
    changeHandler(event){
      const {currentTarget:{dataset:{itemid}}} = event || {}
      this.triggerEvent('changeDetailHandler',{itemid:itemid ?? 0})
    }
  },
  lifetimes:{
    attached(){
    }
  }
})
