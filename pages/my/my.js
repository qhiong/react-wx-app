// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    show: true,
    duration: 400,
    position: 'bottom',
    round: false,
    overlay: true,
    customStyle: '',
    overlayStyle: 'background-color: rgba(0,0,0,0.8)', // 弹出层样式, show 为 true 时候 遮罩层的样式
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData:false // 如需尝试获取用户信息可改为false
  },
  // 点击遮罩层的回调函数
  onClickOverlay(event){
    if(!this.data.hasUserInfo) this.setData({show:true})
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onShow(){
    if(!this.data.hasUserInfo) this.setData({show:true})
  },
  // 获取用户电话号码  需要 发送两次请求, 一个是 获取 接口调用凭证(get请求access_token), 然后使用 access_token + 手机号获取凭证 (code)  再次发送请求 解析 手机号, 以下函数在真实情况下 可以通过 e.detail.code 拿到 code  每个code只能使用一次，code的有效期为5min 
  getPhoneNumber(e){
    console.log(e.detail.code);
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          show:false,
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        const { globalData } = app
        globalData.userInfo = res.userInfo
      },
      fail:(reg)=>{
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})