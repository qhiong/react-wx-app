// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputList:[],
        inputValue:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    // 输入信息
    inputHandler(event){
        const {detail:{value}} = event || {}
        this.setData({inputValue:value})
        if(value === "") this.setData({inputList:[]})
        else{
            wx.request({
                url: `http://10.9.41.240:3000/mock/16/getsearch`,
                method:"POST",
                success:(res)=>{
                    console.log(res);
                    const {data:{data}} = res || {}
                  this.setData({
                      inputList:data
                  })
                }
              })
        }
        
    },
    // 返回首页
    backHomeHandler(){
        wx.switchTab({
          url: '/pages/index/index',
        })
    },
    // 确认搜索
    searchGo(){
        
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