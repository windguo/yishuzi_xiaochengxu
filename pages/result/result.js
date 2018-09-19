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
    this.setData({
      createdImg: options.createdImg
    })
  },
  data:{
    createdImg:''
  },
  navigateBack:function(){
    wx.navigateBack();
  }
})