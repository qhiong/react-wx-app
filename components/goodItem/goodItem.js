// components/goodItem/goodItem.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        target:Array
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
        eventToDetail(options){
            const {id} = options.currentTarget.dataset
            this.triggerEvent("eventToDetail",{id})
        }
    },
    lifetimes:{
        attached(){
        }
    }
})
