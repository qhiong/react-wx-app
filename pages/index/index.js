// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    navList: [{
      src: "https://cdn.weipaitang.com/sky/common/houtaitp/image/20211118/85bb79f75eb3496494b651f0ac0aaeb8-W212H212",
      title: "拍卖行"
    }, {
      src: "https://cdn.weipaitang.com/sky/common/houtaitp/image/20211118/6a40c4f071cf4b24aac67538be3639fe-W212H212",
      title: "众筹"
    }, {
      src: "https://cdn.weipaitang.com/sky/common/houtaitp/image/20211118/38b7d5e9729141bca2db899bae6cdfd7-W212H212",
      title: "直播"
    }, {
      src: "https://cdn.weipaitang.com/sky/common/houtaitp/image/20211118/0fd1833a7d9b4ba8ace73473f28231dc-W212H212",
      title: "鉴宝"
    }],
    adList: [{
        src: "https://cdn.weipaitang.com/static/2020090352b7424f-b87c-424fb87c-c85d-767677eee023-W42H42",
        title: "1000万消费保障"
      },
      {
        src: "https://cdn.weipaitang.com/static/202009031083d4a9-712b-d4a9712b-1d99-d486fc8a90ae-W42H42",
        title: "7天无理由退货"
      },
      {
        src: "https://cdn.weipaitang.com/static/202009032da9f3ea-098a-f3ea098a-73eb-5323f4d9a27d-W42H42",
        title: "30秒极速响应"
      },
      {
        src: "https://cdn.weipaitang.com/static/20210225e54459ac-e598-59ace598-1dd8-9de42512f1f6-W24H24",
      },
    ],
    wiftList: [{
        src: "https://cdn.weipaitang.com/skywebp/fapai/tupian/image/20211202/9fcb3e6572a7419fb53bf55645891a39-W3680H3813/w/640",
        price: "39"
      },
      {
        src: "https://cdn.weipaitang.com/skywebp/fapai/tupian/image/20211202/9fcb3e6572a7419fb53bf55645891a39-W3680H3813/w/640",
        price: "39"
      },
      {
        src: "https://cdn.weipaitang.com/skywebp/fapai/tupian/image/20211202/9fcb3e6572a7419fb53bf55645891a39-W3680H3813/w/640",
        price: "39"
      },
      {
        src: "https://cdn.weipaitang.com/skywebp/fapai/tupian/image/20211202/9fcb3e6572a7419fb53bf55645891a39-W3680H3813/w/640",
        price: "39"
      },
    ],
    itemHeight: 0,
    fallRef: '',
    dataSourceSet: [], // [{ value: [], height: 0 }, {}]
    goodList: [],
    imgList: [],
    mockImgs: [],
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标   1表示显示    0表示不显示
      title: '微拍堂', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20 , // 此页面 页面内容距最顶部的距离
  },

  bindScrollToLower(options) {
    const {
      scrollHeight,
      scrollTop
    } = options.detail
    if (scrollHeight - scrollTop < 800) {
      const that = this
      wx.request({
        url: 'http://127.0.0.1:3000/mock/19/wpt/goods/getGoodsInfo',
        method: "POST",
        success: function (res) {
          that.setData({
            goodList: [...that.data.goodList, ...res.data.data.splice(0, 20)]
          })
          that.loadPageScorll()
        }
      })
    }
  },
  // 根据imgsrc获取img原本的宽高
  getWHBySrc(src) {
    try {
      const step0 = src.match(/(?<=.*-W)\d+H\d+(?=\/w.*)/gi)[0];
      return {
        w: step0.split("H")[0],
        h: step0.split("H")[1],
      };
    } catch (error) {
      return {};
    }
  },
  // 获取最小的高度
  getMinTarget(set) {
    let minIndex = 0;
    for (let i = 0; i < set.length; i++) {
      if (set[i].height < set[minIndex].height) {
        minIndex = i;
      }
    }
    return set[minIndex];
  },
  useDataSourceSet(dataSource) {
    const {
      dataSourceSet,
      itemHeight
    } = this.data
    for (let i = 0; i < 2; i++) {
      dataSourceSet.push({
        value: [],
        height: 0,
      });
    }
    this.setData({
      dataSourceSet
    })
    dataSource.forEach((imgObj) => {
      const {
        imglist
      } = imgObj || {};
      const {
        w,
        h
      } = this.getWHBySrc(imglist[0]);
      const relH = (itemHeight / w) * h;
      const minTarget = this.getMinTarget(dataSourceSet);
      minTarget.value.push(imgObj);
      minTarget.height = minTarget.height + relH;
    });
    return dataSourceSet;
  },
  
  loadPageScorll(){
    const that = this
    var fallRef = that.createSelectorQuery()
    fallRef.select("#water-fall").boundingClientRect()
    fallRef.exec(function (res) {
      that.setData({
        itemHeight: res[0].width * (1 / 2 - 0.01)
      })
      that.setData({
        dataSourceSet: that.useDataSourceSet(that.data.goodList)
      })
    })
  },
  getNewList() {
    const that = this
    wx.request({
      url: 'http://127.0.0.1:3000/mock/19/wpt/goods/getGoodsInfo',
      method: "POST",
      success: function (res) {
        that.setData({
          goodList: res.data.data.splice(0, 20)
        })
        that.loadPageScorll()
      }
    })
  },
  eventToDetail(event){
    wx.navigateTo({
      url: '/pages/detail/detail?id='+event.detail.id,
    })
  },


  onLoad() {
    this.getNewList()
  }
})