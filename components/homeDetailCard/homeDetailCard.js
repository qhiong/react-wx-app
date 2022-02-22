// components/homeDetailCard/homeDetailCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    homeDetailData:Array
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

  },
  lifetimes:{
    attached(){
      console.log(this.properties);
    }
  }
})
