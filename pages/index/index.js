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
        wx.showToast("转发成功");
        // console.log("转发成功", res);
      },
      fail: (res) => {
        wx.showToast("转发成功", res);
        // console.log("转发失败", res);
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
        fontColor: this.data.textColorArray[this.data.textColorArrayIndex].color,
        bgColor: this.data.backgroundColorArray[this.data.backgroundColorArrayIndex].backgroundColor,
        font: e.detail.value['font'],
        fontSize: e.detail.value['fontSize'],
        width: e.detail.value['width'],
        height: e.detail.value['height']
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method:'POST',
      dataType:'json',
      success:(json) => {
        console.log(json);
        wx.navigateTo({
          url: '../result/result?createdImg=' + json.data.result.path
        })
      }
    })
  },
  onLoad:function(){
    wx.request({
      url: 'https://jianjiexcx.92kaifa.com/e/api/creat/get.php?getJson=list',
      method: 'GET',
      dataType: 'json',
      success: (json) => {
        console.log(json.data.result);
        this.setData({
          objectArray:json.data.result
        });
        console.log(this.data.objectArray[0].id)
        this.setData({
          previewImage: 'https://jianjiexcx.92kaifa.com/e/api/creat/get.php?getJson=showPic&font=' + this.data.objectArray[0].id + '&text=张曼玉ABCabc123示例图片&fontSize=20&width=190&height=70',
          // index: this.data.objectArray[0].id
        });
      }
    })
  },
  data:{
    objectArray: [],
    previewImage:'',
    index: 0,
    fontSize:30,
    textColorArray:[
      {
        color: '#000000',
        name: '黑色 #000000',
      },
      {
        color: '#DC143C',
        name: '红色 #DC143C'
      },
      {
        color:'#FFA500',
        name:'橙色 #FFA500'
      },
      {
        color: '#FFFF00',
        name: '黄色 #FFFF00'
      },
      {
        color: '#008000',
        name: '绿色 #008000'
      },
      {
        color: '#00FFFF',
        name: '青色 #00FFFF'
      },
      {
        color: '#0000ff',
        name: '蓝色 #0000ff'
      },
      {
        color: '#800080',
        name: '紫色 #800080'
      },
      {
        color: '#ffffff',
        name: '白色 #ffffff'
      }
    ],
    textColorArrayIndex:0,
    backgroundColorArray: [
      {
        backgroundColor: '#ffffff',
        name: '白色 #ffffff',
        color:'#000000'
      },
      {
        backgroundColor: '#DC143C',
        name: '红色 #DC143C',
        color: '#ffffff'
      },
      {
        backgroundColor: '#FFA500',
        name: '橙色 #FFA500',
        color: '#ffffff'
      },
      {
        backgroundColor: '#FFFF00',
        name: '黄色 #FFFF00',
        color: '#ffffff'
      },
      {
        backgroundColor: '#008000',
        name: '绿色 #008000',
        color: '#ffffff'
      },
      {
        backgroundColor: '#00FFFF',
        name: '青色 #00FFFF',
        color: '#ffffff'
      },
      {
        backgroundColor: '#0000ff',
        name: '蓝色 #0000ff',
        color: '#ffffff'
      },
      {
        backgroundColor: '#800080',
        name: '紫色 #800080',
        color: '#ffffff'
      },
      {
        backgroundColor: '#000000',
        name: '黑色 #000000',
        color: '#ffffff'
      }
    ],
    backgroundColorArrayIndex: 0,
    createdImg:''
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    console.log('====', this.data.objectArray[e.detail.value].id);
    this.setData({
      previewImage: 'https://jianjiexcx.92kaifa.com/e/api/creat/get.php?getJson=showPic&font=' + this.data.objectArray[e.detail.value].id + '&text=张曼玉ABCabc123示例图片&fontSize=20&width=190&height=70',
      index: e.detail.value
    });
  },
  bindPickerTextColorChange: function (e) {
    console.log('textColorArray=发送选择改变，携带值为', e.detail.value)
    this.setData({
      textColorArrayIndex: e.detail.value
    })
  },
  bindPickerBackgroundColorChange: function (e) {
    console.log('backgroundColorArray=发送选择改变，携带值为', e.detail.value)
    this.setData({
      backgroundColorArrayIndex: e.detail.value
    })
  },
  slider4change:function(e){
    this.setData({
      fontSize:e.detail.value
    })
  }
})
