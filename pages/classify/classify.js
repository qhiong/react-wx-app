// pages/classify/classify.js
const App = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navList: [], // 左侧导航条数据(包含全部数组)
        showIndex: 0, // 当前展示的标签
        classifyBoxTop:0 ,// 控制滚动条top
        showDetails:false ,// 分类页点击事件的单页面详情页切换 
        detailList:[], // 多个的详情页数据
        scrollDetail:0, // 详情页滚动条滚动数据
        scrollDetailTop:0, // 详情页控制滚动条跳转数据
    },
    // 左侧导航条点击事件
    navLeftChange(event) {
        const {
            currentTarget: {
                dataset: {
                    indexid
                }
            }
        } = event
        this.setData({
            showIndex: indexid
        })
        // 通过这个 API 获取 选择器中 所选择元素的位置信息, select 只选择一个, selectAll 选择这个选择器组成的数组
        const query = wx.createSelectorQuery()
        query.selectAll('.classify-list-box').boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec((res)=>{
            // 解构出来比当前点击 index 小的数组
            const arr = res[0].filter((item,index)=>index < indexid)
            // 使用这个数组,计算数具体应该top出去多少,使用每一个的高度相加即可
            // 这里最后加上了5 如果不加5 每次点击会有5个的落差,不知道哪来的
            const changeHeigh = arr.reduce((prev,item)=>{
                return prev+item.height+5
            },0)
            // 设置 滚动条 top 完成定位
            this.setData({classifyBoxTop:changeHeigh})
        })
    },
    // 右侧菜单滚动事件
    classifyScroll(event){
        const query = wx.createSelectorQuery()
        query.selectAll('.classify-list-top').boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec((res)=>{
            const axc = res[0].find(item=>item.top >= 0 && item.top <= 80)
            try{
                const {dataset:{changeindex}} = axc || {}
                this.setData({showIndex:changeindex})
            }catch(err){
            }
            
        })
    },
    // 点击单张信息跳转事件
    changeDetailHandler(event){
        const {detail:{itemid}} = event
        wx.request({
          url: 'http://10.9.41.240:3000/mock/16/classify/detail',
          method:'POST',
          data:{lgoodsID:itemid},
          success:(res)=>{
              const {data:{list}} = res
              this.setData({detailList:list})
              console.log(list)
          }
        })
        this.setData({
            showDetails:true
        })
    },
    // 顶部自定义 导航条 搜索跳转
    changeSearchHandler(){
        wx.navigateTo({
          url: '/pages/search/search',
        })
    },
    // 详情页面滚动条事件
    scrollDetailHandler(event){
        const {detail:{scrollTop}} = event
        this.setData({
            scrollDetail:scrollTop
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            navHeight: App.globalData.navHeight,
            navTop:App.globalData.navTop
          })
        wx.request({
            url: 'http://10.9.41.240:3000/mock/16/listAll',
            success: (res) => {
                const {
                    data: {
                        list
                    }
                } = res || {}
                this.setData({
                    navList: list
                })
            }
        })
        // 暂时无用
        wx.createIntersectionObserver(this, {
            thresholds: [0.2, 0.5] })
            .relativeTo('.navigator-img-box')
            .relativeToViewport()
            .observe('.classify-list-top',(res)=>{
                console.log(res);
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
    // 每次进入分类页 都将showDetails 改为 false, 也就是默认显示菜单, 不显示详情
    this.setData({showDetails:false})
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