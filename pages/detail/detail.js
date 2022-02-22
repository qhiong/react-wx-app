// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: [],
    dataNow: '', // 月日
    timeEnd: '',// 倒计时时间
    homeDetailData:[], // 传入组件里的数据
    comBoxTop:0, // 返回顶部
    changeDetailTop:0 // 显示返回顶部按钮
  },

  /**
   * 生命周期函数--监听页面加载
   * 用过 options 接收到商品id , 发送请求,获取页面渲染需要的信息
   */
  onLoad: function (options) {
    // 顶部个人信息部分的请求
    wx.request({
      url: 'http://10.9.41.240:3000/mock/16/home/detail',
      dataType: 'json',
      method: 'POST',
      data: {
        id: options.id
      },
      success: (res) => {
        const {
          data: {
            list
          }
        } = res || {}
        this.setData({
          userData: list[0]
        })
        this.setData({
          dataNow: Number(this.data.userData.times.split('-')[1]) + '月' + Number(this.data.userData.times.split('-')[2].split(' ')[0]) + '日' + '  ' + this.data.userData.times.split('-')[2].split(' ')[1].slice(0, 5)
        })
      }
    })
    // 下方多图片的请求
    wx.request({
      url: 'http://10.9.41.240:3000/mock/16/banner',
      success:(res)=>{
        const {data:{list}} = res || {}
        this.setData({
          homeDetailData:list.slice(0,8)
        })
      }
    })
    // 模拟倒计时
    const oldDate = parseInt(Math.random()*1230400);
    const res = function (data) {
      var s;
      var hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = parseInt((data % (1000 * 60)) / 1000);
      s = (hours < 10 ? ('0' + hours) : hours) + '时' + (minutes < 10 ? ('0' + minutes) : minutes) + '分' + (seconds < 10 ? ('0' + seconds) : seconds);
      return s;
    };
    setInterval(()=>{
      this.setData({
        timeEnd:res(Date.now()-oldDate)
      })
    },200)
  },
  // 返回顶部
  backComTop(){
    this.setData({
      comBoxTop:0
    })
  },
  // 滚动事件
  comScrollHandler(event){
    const {detail:{scrollTop}} = event || {}
    this.setData({
      changeDetailTop:scrollTop
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