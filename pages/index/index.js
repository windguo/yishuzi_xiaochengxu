Page({
  onShareAppMessage:function(res){
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title:'看看我设计的签名帅气不，点击来试试！',
      // path:'/',
      imageUrl:this.data.createdImg,
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    wx.request({
      url: 'https://jianjiexcx.92kaifa.com/e/api/creat/index.php',
      data:{
        text: e.detail.value.text,
        fontSize: 50,
        width: 300,
        height: 150,
        font:this.data.index
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method:'POST',
      dataType:'json',
      success:(json) => {
        console.log(json);
        wx.navigateTo({
          url: '../result/result?createdImg=' + json.data.result.path
        })
        // this.setData({
        //   createdImg: json.data.result.path
        // })
      }
    })
  },
  onLoad:function(){
    wx.request({
      url: 'https://jianjiexcx.92kaifa.com/e/api/creat/get.php?getJson=list',
      method: 'GET',
      dataType: 'json',
      success: (json) => {
        this.setData({
          objectArray:json.data.result
        });
      }
    })
  },
  data:{
    objectArray: [],
    index:1,
    createdImg:''
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
})