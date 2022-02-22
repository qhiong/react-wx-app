// pages/community/components/header/header.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        currentFind:Boolean
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
        onClickChangeFind(options){
            const {bool} = options.currentTarget.dataset
            this.triggerEvent("onClickChangeFind",{bool})
        }
    }
})
