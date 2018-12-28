Page({
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '看看我设计的签名帅气不，点击来试试！',
      path: '/pages/index/index',
      imageUrl: this.data.shareTempFilePath,
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
    wx.showLoading({
      title: '生成中'
    });
    console.log('options', options)
    wx.setNavigationBarTitle({
      title: '生成结果页'
    })
    this.setData({
      createdImg: options.createdImg,
      width: options.width,
      height: options.height
    })
    var that = this
    wx.getImageInfo({
      src: that.data.createdImg,
      success: function (res) {
        console.log('that.data.width', that.data.width)
        const windowWidth = wx.getSystemInfoSync().windowWidth
        var context = wx.createCanvasContext('share')
        context.drawImage('../../static/images/qianming_bg.png', windowWidth / 2 - 150, 0, 300, 225)
        context.drawImage(res.path, 0, 60, that.data.width, that.data.height)

        context.draw(false, that.getTempFilePath);
        wx.hideLoading();
      }
    })
  },
  data: {
    createdImg: '',
    shareTempFilePath: '',
    width: 300,
    height: 150
  },
  goDesignPage:function(){
    wx.switchTab({
      url: '../design/design'
    });
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
  // 保存至相册
  saveImageToPhotosAlbum: function () {
    if (!this.data.shareTempFilePath) {
      wx.showModal({
        title: '提示',
        content: '图片绘制中，请稍后重试',
        showCancel: false
      })
    }
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareTempFilePath,
      success: (res) => {
        if (res.errMsg == 'saveImageToPhotosAlbum:ok') {
          wx.showModal({
            content: '保存成功',
            showCancel: false
          })
        }
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }
})
