let isAdFlag = false;
// 在页面中定义插屏广告
let interstitialAd = null

// 在页面onLoad回调事件中创建插屏广告实例
if (wx.createInterstitialAd) {
  interstitialAd = wx.createInterstitialAd({
    adUnitId: 'adunit-34c3a191e5c4bdaa'
  })
  interstitialAd.onLoad(() => {})
  interstitialAd.onError((err) => {})
  interstitialAd.onClose(() => {})
}

// 在适合的场景显示插屏广告
if (interstitialAd) {
  interstitialAd.show().catch((err) => {
    console.error(err)
  })
}
Page({
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '看看我设计的签名帅气不，点击来试试！',
      path: '/pages/index/index',
      success: (res) => {
        wx.showToast({
          title: '转发成功'
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '转发失败，原因是' + res
        })
      }
    }
  },
  onLoad: function (options) {
    console.log('options', options);
    this.setData({
			createdImg: options.createdImg,
			width: options.width,
			height: options.height
    });
    this.getAishouxieListData()
  },
  data: {
    newShopArray:[],
    objectArray:[],
    createdImg: '',
    shareTempFilePath: '',
		autoplay: true,
		interval: 5000,
		duration: 500,
    width: 300,
    height: 150
  },
  getAishouxieListData: function () {
    let that = this
    wx.request({
      url: getApp().globalData.aishouxieRoots + '/wxxcx/shop/index',
      method: 'GET',
      dataType: 'json',
      success: (json) => {
        if (json.data.status == '20000000') {
          that.setData({
            newShopArray: json.data.result
          })
          wx.hideLoading()
        }
      }
    })
  },
  previewImage: function (e) {
    console.log('eee', e)
    var current = e.target.dataset.src
    console.log('currentcurrent', current)
    wx.previewImage({
      current: current,
      urls: ['' + current + '']
    })
  },
  goDesignPage: function () {
    wx.switchTab({
      url: '../design/design'
    })
  },
  navigateBack: function () {
    wx.navigateBack()
  },
  // 获取临时路径
  getTempFilePath: function () {
    wx.canvasToTempFilePath({
      canvasId: 'share',
      success: (res) => {
        this.setData({
          shareTempFilePath: res.tempFilePath
        })
      }
    })
  },
  showVideoAd:function(){
		let that = this ;
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
				if (err.errCode == 1004){
					isAdFlag = true;
				}
			})
			videoAd.onClose(res => {
			// 用户点击了【关闭广告】按钮
			// 小于 2.1.0 的基础库版本，res 是一个 undefined
			if (res && res.isEnded || res === undefined) {
				console.log('正常播放结束，可以下发游戏奖励');
				wx.downloadFile({
          url: that.data.createdImg,     //仅为示例，并非真实的资源
          success: function (res) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success(res) {
                  wx.showToast({
                    title: '保存图片成功！',
                  })
                },
                fail(res) {
                  wx.showToast({
                    title: '保存图片失败！',
                  })
                }
              })
            }
          }
        })
				// 正常播放结束，可以下发游戏奖励
			} else {
				console.log('播放中途退出，不下发游戏奖励');
				// 播放中途退出，不下发游戏奖励
			}
		})
	},
  // 保存至相册
  saveImageToPhotosAlbum: function () {
    console.log('==saveImageToPhotosAlbumsaveImageToPhotosAlbum===');
    this.showVideoAd();
  }
})
