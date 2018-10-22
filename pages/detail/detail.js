var WxParse = require('../../wxParse/wxParse.js');
Page({
    data:{
      id:null,
      titlepic:'',
      title:'',
      price:'',
      tprice:'',
      pmaxnum:'',
      psalenum:'',
      newstext:''
    },
  onLoad: function (options){
    var that = this;
    wx.showLoading({});
    wx.setNavigationBarTitle({title: '商城详情'});
    wx.request({
      url: 'https://www.yishuzi.com.cn/e/api/shop/?getJson=content&id='+options.id,
      method: 'GET',
      dataType: 'json',
      success: (json) => {
        console.log('content&idcontent&idcontent&idcontent&id', json.data);
        var newstext = json.data.result[0].newstext;
        WxParse.wxParse('newstext', 'html', newstext, that, 5);
        this.setData({
          id: json.data.result[0].id,
          titlepic: json.data.result[0].titlepic,
          title: json.data.result[0].title,
          price: json.data.result[0].price,
          tprice: json.data.result[0].tprice,
          pmaxnum: json.data.result[0].pmaxnum,
          psalenum: json.data.result[0].psalenum
        });
        wx.hideLoading();
      }
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '一笔签名设计,快来申请定制独一无二的签名',
      path:'/pages/detail/detail?id='+this.data.id,
      imageUrl: '',
      success: (res) => {
        wx.showToast({
          content: '分享成功'
        });
      },
      fail: (res) => {
        wx.showToast({
          content: '分享失败,原因是' + res
        });
      }
    }
  },
})