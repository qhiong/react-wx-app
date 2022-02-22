// components/homeNav/homeNav.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        navList:Array
    },

    /**
     * 组件的初始数据
     */
    data: {

    },
    attached(){
      
    },
    /**
     * 组件的方法列表
     */
    methods: {
        navChangeHandler(event){
            const {currentTarget:{dataset:{title}} } = event 
            this.triggerEvent('changeNavListHandler',{title})
        }
    }
})
