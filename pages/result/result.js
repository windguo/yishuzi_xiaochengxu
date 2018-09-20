Page({
  onShareAppMessage:function(res){
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title:'看看我设计的签名帅气不，点击来试试！',
      path:'/pages/index/index',
      imageUrl:this.data.createdImg,
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },
  onLoad:function(options){
    console.log('options', options);
    this.setData({
      createdImg: options.createdImg,
      width: options.width,
      height: options.height
    });
    var that = this;
    wx.getImageInfo({
      src: that.data.createdImg,
      success: function (res) {
        console.log('that.data.width', that.data.width);
        var context = wx.createCanvasContext('share');
        context.drawImage(res.path, 0, 0, that.data.width,that.data.height);
        context.drawImage('../../qcode.png', 0, 200, 300,86);
        context.draw(false, that.getTempFilePath)
      }
    })
  },
  data:{
    createdImg:'',
    shareTempFilePath:'',
    width:300,
    height:150
  },
  navigateBack:function(){
    wx.navigateBack();
  },
  //获取临时路径
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
  //保存至相册
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
        if (res.errMsg == "saveImageToPhotosAlbum:ok"){
          wx.showModal({
            title: '提示',
            content: '保存成功'
          })
        }
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }
})