// components/search/search.js
/**
 * 搜索的组件
 *  @props
 *  - searchBtn boolean 搜索按钮是否存在
 *  - searchFn 搜索的点击事件
 */
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        top:Number,
        bgColor:String,
        posi:Boolean,
        height:Number
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
        goSearch(){
            wx.navigateTo({
              url: './../../pages/search/search',
            })
        }
    }
})
