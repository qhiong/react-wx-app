# 微拍堂小程序项目

## 技术栈

### 开发依赖

- 微信开发者工具
- Yapi

### 目录结构

- components  公共组件
- pages 页面
- public 静态资源
- utils 公共方法
- app.js
  - globalData 全局数据
    - userInfo: null 个人信息 初始化为null
    - navTop 胶囊按钮与顶部距离
    - navHeight 导航高度
    - windowHeight 页面高度
  -  wx.getSystemInfo 获取设备各项参数
    - 通过 success 回调中的  res.statusBarHeight 获取状态栏高度
  - wx.getMenuButtonBoundingClientRect 获取胶囊按钮信息
- app.json
  - tabBar 底部导航条
  - window
    - 配置 navigationStyle:"custom" 使用自定义导航条
  - entryPagePath 默认页面

### 接口

- 使用了 Yapi Mock数据 , 具体接口如下
  - 首页 get请求 http://127.0.0.1:3000/mock/16/banner
  - 分类页 get请求 http://127.0.0.1:3000/mock/16/listAll
  - 社区页 get请求 http://127.0.0.1:3000/mock/16/community
  - 分类页商品详情 post请求 携带参数: more:string;IgoodsID:string http://127.0.0.1:3000/mock/16/classify/detail
  - 首页商品详情 post请求 携带参数: more:string;id:string http://127.0.0.1:3000/mock/16/home/detail

## 页面

### 首页

- navBar组件 *自定义顶部导航条*
  - 参数
    - navHeight:number 导航栏高度
    - bgColor:string 背景颜色
    - showHome:bool 是否显示左侧返回主页按钮
    - navTop:number 导航栏距离手机顶部top值 
    - iconColor:string 左侧小图标颜色
    - showText:bool 是否显示中间文字信息
    - pageName:string 中间文本内容
  - 方法
    - _toIndex:function 点击首页按钮返回首页
    - _navBack:function 点击回退按钮返回上一页
      - 由于使用了微信接口提供的 tabBar 这里的返回上一页暂时无效,当使用自定义的 tabBar 的时候,则可以使用返回上一页
  - 组件
    - ss-icon
      - name:string 使用的图标样式(这里使用了自定义类名的方式引用iconfont css样式)
      - color:string 图标颜色(默认黑色)
      - size:string 图标大小
      - info:string 图标文字信息(默认无)
  - `样式问题`
    - 1. 在使用了 navigationStyle:"custom" 以后, 整个页面将会铺满手机窗口,包括最上方时间|电池信息显示部分,所以页面最外层容器需要使用固定定位.
      2. 页面中的 100vh 高度包含了最顶部的那一部分,在计算剩余部分的时候,需要将顶部那一部分减去, 已经在 globalData 中通过胶囊按钮与顶部距离获取到.
      3. 书写行内样式的时候需要注意单双引号的配合,使用变量的时候注意加单位 如 style='height:{{navHeight}}px;background-color:{{bgColor}}'
- topInput组件 *搜索框*
  - navigator 这里使用了 navigator 微信提供的导航组件,实现搜索页跳转
  - 参数
    - showBtn:bool 是否显示右侧搜索按钮
    - showText:string 右侧搜索按钮的文字信息(默认值"搜索")
    - myStyle:string 自定义样式
- homeNav组件 *首页中部图片导航*
  - 参数
    - navList:Array 渲染数据
  - 方法
    - changeNavListHandler:function 点击对应图片的回调函数,这里使用了 data- 的方式定义到了对应标签上自定义属性,点击的时候通过event:currentTarget 拿到自定义属性,通过this.triggerEvent 跳转传入的自定义方法, 使用第二个参数进行传参,在父组件的回调函数中就能够通过参数接收到自定义属性
- banner组件 *首页中部轮播图*
  - 参数
    - bannerList:Array 渲染数据
- homeImgCard组件 *首页底部瀑布流单个图片信息*
  - 参数
    - bannerList:Array 渲染数据
  - 方法
    - onclick 点击事件的回调函数
  - `样式问题`
    - 1. 使用 flex 弹性盒的时候, wx默认子元素 是 flex: 1 0 auto, 所以要调整子元素是否撑满宽度需要重新调整
      2. 使用弹性盒最好配合 box-sizing:border-box, 以方便于调整 padding
      3. 设置图片的时候, 宽度最好不要使用百分比,容易失真, 宽度计算好以后给 rpx

### 首页商品详情

- 通过传入 homeImgCard 组件的回调函数,接收到商品id,使用 wx.navigateTo 跳转页面, id携带到 url?后面, 详情页加载之前通过这个id发送请求获取商品数据,进行页面渲染

- navBar组件
- topInput组件
- homeDetailCard组件 *首页详情页商品单张信息组件*
  - 参数
    - homeDetailData:Array 渲染数据

### 分类页

- navBar组件
- topInput组件
- detailImgCard组件 *分类页商品详情信息组件*
  - bannerList:Array 渲染数据
- classifyListItem组件 *分类页右侧单个商品组件*
  - 参数
    - List:Array 渲染数据
  - 方法
    - changeDetailHandler 回调函数 这里使用了data-itemId="{{item.id}}" 自定义属性携带id, 将当前点击商品的id 传入this.triggerEvent 的第二个参数, 回调函数通过参数接收此id实现详情页跳转
- `样式问题`
  - 点击商品跳转以后的页面, 有一个滚动条向上,排序|筛选 部分会过渡向上覆盖 竞拍|一口价 部分, 此处主要利用了 滚动条的滚动事件, 拿到top 值, 通过 top 值的大小去改变样式,实现效果
  - 这里需要注意的是, 排序|筛选 部分 和下方 滚动的盒子 都需要修改定位, 上面的部分需要有过渡动画,下面的没有过渡动画, 使用相对定位, 因为使用绝对定位会脱离文档流, 而且使用了 自定义导航栏,top值不便于计算
- `导航联动`

> 左右导航联动使用了 数据---视图 绑定的方法, 采用了wx.createSelectorQuery API

- - 参数

    - showIndex: 0, *当前展示的标签* 

      classifyBoxTop:0 ,*控制滚动条top*

  - 方法

    - navLeftChange *左侧导航条点击事件*

      点击的时候通过自定义属性 index, 拿到当前点击的下标, 设置为 showIndex

      通过createSelectorQuery  返回的 query.selectAll 获取右侧全部导航栏信息组成的数组, 通过index,筛选数组中 下标小于index的项, 数组的每一项是一个对象,对象中的height属性就是当前数组此项所在元素的高度,高度累加,得到点击事件中所有下标比当前点击小的元素的全部高度,设置 为classifyBoxTop , 依赖于 scroll-top="{{classifyBoxTop}}" 实现右侧导航栏联动

    - classifyScroll *右侧菜单滚动事件*

      通过 bindscroll="classifyScroll" 绑定滚动事件, 实时触发, 同样通过createSelectorQuery,query.selectAll,query.selectViewport().scrollOffset()query.exec(res) 实时获取全部右侧数组的数据, 然后通过 res 这个数组, 筛选 当前 top 值在合适区间范围的元素, 也就是当此元素滚动到距离页面顶部一定距离的时候触发,  这里需要在元素上设置自定义属性,data-changeIndex="{{index}}", 那么在获取到的这个数组中使用find 方法拿到目标元素以后 通过 dataset 拿到自定的 index , 设置 showIndex, 实现左边导航栏 样式联动

```javascript
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
```

### 社区页

- navBar组件
- comList组件 *社区页详情组件*
  - 参数 
    - imgListAll:Array 渲染数据
  - <slot></slot> 插槽 

### 我的

- navBar组件

### 搜索页

- navBar组件
- topInput组件

## 参考

- https://www.cnblogs.com/sese/p/9761713.html 微信小程序自定义导航栏



