// components/homeImgCard/homeImgCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bannerList:Array
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
    changeHandler(event){
      const {currentTarget:{dataset:{detailid}}} = event
      this.triggerEvent('onclick',{detailid})
    }
  }
})
