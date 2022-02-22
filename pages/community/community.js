// pages/community/community.js

const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:{},
        currentFind:true,
        navList:[
            {id:0,title:"推荐"},
            {id:1,title:"钱币邮票"},
            {id:2,title:"玉翠珠宝"},
            {id:3,title:"紫砂陶瓷"},
            {id:4,title:"花鸟文娱"},
            {id:5,title:"书画印章"},
            {id:6,title:"工艺作品"},
            {id:7,title:"文玩杂项"},
            {id:8,title:"茶酒滋补"},
            {id:9,title:"更多"},
        ],
        currentNav:0,
        commItenList:[]
    },

    onClickChangeFind(options){
        const {bool} = options.detail
        if(bool==="true"){
            this.setData({
                currentFind:true
            })
        }else{
            this.setData({
                currentFind:false
            })
        }
    },
    onClickChangeNav(options){
        const {id} = options.detail
        this.setData({
            currentNav:id
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.request({
          url: 'http://127.0.0.1:3000/mock/19/wpt/community/commitem',
          method:"POST",
          success:(res)=>{
              this.setData({
                commItenList:res.data.data
              })
          }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})