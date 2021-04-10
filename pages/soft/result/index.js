// pages/result/index.js
Page({
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '签名设计结果' // 导航栏标题
    });
    wx.showLoading({
      title: '设计中...'
    });
    console.log('....options.....',options)
    this.setData({
      createdImg:'https://www.yishuzi.com.cn/m8Gs_pic/?name=' + options.name
    })
    wx.request({
      url: 'https://www.yishuzi.com.cn/shop_xiaochengxu_api/wx-sxqmsj.php?getJson=column&classid=9999',
        method: 'GET',
        dataType: 'json',
        success: (json) => {
            console.log('desiginList',json.data);
            this.setData({
                objectArray: json.data.result
            });
            wx.hideLoading();
        }
    })
    wx.hideLoading();
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
  data: {
    objectArray:[],
    createdImg: '',
    shareTempFilePath: '',
    width: 300,
    height: 150
  },
  navigateBack: function () {
    wx.navigateBack()
  },
  backHome(){
    wx.switchTab({
      url: '/pages/design/design'
    })
  },
  // 获取临时路径
  getTempFilePath: function () {
    let that = this;
    wx.downloadFile({
      url: that.data.createdImg,
      success(res) {
        if (res.statusCode === 200) {
          console.log('shareTempFilePath---',`${res.tempFilePath}`);
          that.setData({
            shareTempFilePath:`${res.tempFilePath}`
          })
          wx.saveImageToPhotosAlbum({
            filePath: `${res.tempFilePath}`,
            success(res) {
              console.log(`saveImageToPhotosAlbum调用成功`);
              if (res.errMsg == 'saveImageToPhotosAlbum:ok') {
                wx.showModal({
                  content: '保存成功',
                  showCancel: false
                })
              }
            },
            fail(res) {
              console.log(`saveImageToPhotosAlbum调用失败`);
            }
          });
        }
      },
      fail(res) {
        console.log(`downloadFile调用失败`);
      }
    });
  },
  // 保存至相册
  saveImageToPhotosAlbum: function () {
    this.getTempFilePath();
  }
})