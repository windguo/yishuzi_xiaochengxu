var COMMONFN = require('../../../utils/util.js')
let isAdFlag = false;
const app = getApp()
Page({
  data: {
    name: '',
    bannerArray: [{
        picurl: '/static/images/banner/1.jpg'
      },
      {
        picurl: '/static/images/banner/2.jpg'
      },
      {
        picurl: '/static/images/banner/3.jpg'
      },
      {
        picurl: '/static/images/banner/4.jpg'
      },
      {
        picurl: '/static/images/banner/5.jpg'
      },
      {
        picurl: '/static/images/banner/6.jpg'
      },
      {
        picurl: '/static/images/banner/7.jpg'
      },
      {
        picurl: '/static/images/banner/8.jpg'
      },
      {
        picurl: '/static/images/banner/9.jpg'
      },
      {
        picurl: '/static/images/banner/10.jpg'
      }
    ],
    userid: wx.getStorageSync('storageLoginedUserId'),
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 5000,
    duration: 500
  },
  showVideoAd: function () {
    let that = this;
    let videoAd = wx.createRewardedVideoAd({
      adUnitId: 'adunit-3c1d326d0ef1cf22'
    });
    videoAd.load()
      .then(() => {
        videoAd.show();
        isAdFlag = false;
      })
      .catch(err => {
        console.log('err.errMsgerr.errMsg---', err.errCode);
        if (err.errCode) {
          isAdFlag = true;
          wx.showModal({
            title: '提示信息',
            content: '请重新【点击立即免费】按钮'
          })
        }
      })
    videoAd.onClose(res => {
      // 用户点击了【关闭广告】按钮
      // 小于 2.1.0 的基础库版本，res 是一个 undefined
      if (res && res.isEnded || res === undefined) {
        console.log('正常播放结束，可以下发游戏奖励');
        that.results();
        // 正常播放结束，可以下发游戏奖励
      } else {
        console.log('播放中途退出，不下发游戏奖励');
        // 播放中途退出，不下发游戏奖励
      }
    })
  },
  results() {
    wx.navigateTo({
      url: '../result/index?name=' + this.data.name
    })
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '免费设计签名',
    })
  },
  rand() {
    var num = ""; //定义用户编号
    for (var i = 0; i < 4; i++) //4位随机数，用以加在时间戳后面。
    {
      num += Math.floor(Math.random() * 10);
    }
    num = new Date().getTime() + num; //时间戳，用来生成用户编号。
    return num;
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '一键免费生成签名设计,彰显个性,快来生成吧',
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
  submits(e) {
    console.log('....e....', e);
    var that = this;
    wx.showLoading({
      title: '设计中...'
    });
    this.setData({
      name: e.detail.value.name
    })
    console.log('.....name....', this.data.name)
    if (e.detail.value.name == '') {
      wx.showModal({
        content: '请输入姓名'
      })
      wx.hideLoading();
      return false
    } else {
      wx.request({
        url: 'https://www.yishuzi.com.cn/shop_xiaochengxu_api/wx-yishuzishengcheng_safe.php?content=' + this.data.name, // 目标服务器url
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        dataType: 'json',
        success: (res) => {
          console.log('=====res====', res.data.result.errmsg)
          if (res.data.result.errmsg == 'ok') {
            wx.hideLoading()
            this.showVideoAd();
            // const that = this
            // wx.request({
            //   url: getApp().globalData.baseRootUrl + 'freepay/weixin-order.php?getJson=1', // 目标服务器url
            //   data: {
            //     classid: 'free_classid',
            //     orderfrom: 'wx-free_sxqm',
            //     qid: 'free_id',
            //     price: '0.99',
            //     orderid: that.rand(),
            //     truename: e.detail.value['name'],
            //     quserid:'free_quserid',
            //     userid: that.data.userid
            //   },
            //   header: { 'content-type': 'application/x-www-form-urlencoded' },
            //   method: 'POST',
            //   dataType: 'json',
            //   success: (json) => {
            //     var that = this;
            //     console.log('json----',json.data);
            //     console.log("json.data.status === '1'",json.data.status === '1')
            //     if (json.data.status == 87014){
            //       wx.showModal({
            //         content: json.data.result.probtext
            //       });
            //       wx.hideLoading();
            //       return false;
            //     }else if (json.data.status === '1') {
            //       console.log('....getApp().globalData.platform == ',getApp().globalData.platform)
            //       if(getApp().globalData.platform){
            //         wx.hideLoading()
            //         wx.showModal({
            //           content: '订单提交成功,但由于政策调整,ios端暂时无法继续支付,如需继续支付，请联系客服微信号:275333',
            //           success: (res) => {
            //             if (res.confirm) {
            //               wx.navigateTo({
            //                 url: '/pages/my/order/index?userid=' + that.data.userid
            //               })
            //             }
            //             this.setData({
            //               isMask:true
            //             })
            //           }
            //         })
            //         return false
            //       }else{
            //         //安卓调支付
            //         let thisid = json.data.result.orderid;
            //         var that = this;
            //         wx.request({
            //           url: getApp().globalData.baseRootUrl + 'freepay/weixin-order.php?getJson=2',
            //           data:{
            //             orderid: thisid
            //           },
            //           header: { 'content-type': 'application/x-www-form-urlencoded' },
            //           method: 'post',
            //           dataType: 'json',
            //           success(res){
            //             // console.log('1111-',res);
            //             var data = res.data;
            //             // console.log('22----',data)
            //             if(data.error == 0){
            //               app.mistake(data.msg, '../../../');
            //               return false;
            //             }
            //             wx.hideLoading();
            //             wx.requestPayment({         //调起支付
            //               //下边参数具体看微信小程序官方文档
            //               timeStamp: data.result.timeStamp,
            //               nonceStr: data.result.nonceStr,
            //               package: data.result.package,
            //               signType: data.result.signType,
            //               paySign: data.result.paySign,
            //               success(res) {
            //                 if (res.errMsg == "requestPayment:ok") {
            //                   console.log('....freepay/weixin-order-back.php....')
            //                   wx.request({　　　　　　//这个是支付成功后改变订单状态的代码
            //                     url: getApp().globalData.baseRootUrl + 'freepay/weixin-order-back.php',
            //                     data: {
            //                       out_trade_no: thisid
            //                     },
            //                     header: { 'content-type': 'application/x-www-form-urlencoded' },
            //                     method: 'post',
            //                     dataType: 'json',
            //                     success(r) {
            //                       console.log('rrrrrrr====',r.data.result);
            //                       if (r.data.result.order_type == 1) {
            //                         wx.reLaunch({
            //                           url: '/pages/index/index'
            //                         })
            //                       }
            //                     }
            //                   })
            //                 }
            //               },
            //               fail(res) { }
            //             })
            //           }
            //         })
            //       }
            //       // wx.showModal({
            //       //   content: '订单提交成功,24小时内会联系您',
            //       //   success: (res) => {
            //       //     if (res.confirm) {
            //       //       wx.navigateTo({
            //       //         url: '/pages/my/order/index?userid=' + that.data.userid
            //       //       })
            //       //     }
            //       //     this.setData({
            //       //       isMask:true
            //       //     })
            //       //   }
            //       // })

            //       // wx.hideLoading();

            //     }
            //   }
            // })
          } else {
            wx.showModal({
              content: '因相关法律和要求，相关搜索结果不予展示'
            });
            wx.hideLoading();
          }
        }
      });
    }

  }
})