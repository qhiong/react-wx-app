// pages/community/components/nav/nav.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        currentNav:Number,
        navList:Array
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
        onClickChangeNav(options){
            const {id} = options.currentTarget.dataset
            this.triggerEvent("onClickChangeNav",{id})
        }
    }
})
