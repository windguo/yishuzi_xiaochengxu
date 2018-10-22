Page({
  data: {
    id: null,
    titlepic: '',
    title: '',
    price: 1,
    ddno: null
  },
  onLoad: function (options){
    this.setData({
      ddno: parseInt(new Date().getTime() * 12) + Math.floor(Math.random() * 10000)
    })
    wx.showLoading({})
    wx.setNavigationBarTitle({title: '订单页面'});
    wx.request({
      url: 'https://www.yishuzi.com.cn/e/api/shop/?getJson=content&id=' + options.id,
      method: 'GET',
      dataType: 'json',
      success: (json) => {
        console.log('content&idcontent&idcontent&idcontent&id', json.data);
        this.setData({
          id: json.data.result[0].id,
          titlepic: json.data.result[0].titlepic,
          title: json.data.result[0].title,
          price: json.data.result[0].price
        });
        wx.hideLoading();
      }
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e);
    if (e.detail.value.truename == '') {
      wx.showModal({
        content: '请输入您的姓名',
        showCancel: false,
        confirmColor: '#ff5a00'
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000);
      return false;
    } else if (e.detail.value.email == '') {
      wx.showModal({
        content: '请输入您的邮箱地址',
        showCancel: false,
        confirmColor: '#ff5a00'
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000);
      return false;
    } else if (e.detail.value.oicq == '') {
      wx.showModal({
        content: '请输入您的微信号',
        showCancel: false,
        confirmColor: '#ff5a00'
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000);
      return false;
    } else if (e.detail.value.phone == '') {
      wx.showModal({
        content: '请输入您的手机号',
        showCancel: false,
        confirmColor: '#ff5a00'
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000);
      return false;
    } else if (e.detail.value.bz == '') {
      wx.showModal({
        content: '请输入您的备注信息',
        showCancel: false,
        confirmColor: '#ff5a00'
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000);
      return false;
    };
    wx.request({
      url: 'https://www.yishuzi.com.cn/e/ShopSys/doaction.php',
      data: {
        ddno:this.data.ddno,
        truename: e.detail.value.truename,
        email: e.detail.value.email,
        oicq: e.detail.value.oicq,
        bz: e.detail.value.bz,
        phone: e.detail.value.phone,
        alltotal: Number(this.data.price),
        yishuziForm:'xiaochengxu',
        psid:5,
        payfsid:7,
        Submit:'提交订单',
        enews:'AddDd',
        alltotalfen:0,
        mycall:'',
        msn:'',
        address:'',
        zip:'',
        signbuild:'',
        besttime:'',
        precode:''
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      dataType: 'json',
      success: (json) => {
        console.log('jsonjsonjson========',json.data);
        wx.showModal({
          content: json.data.result + '请添加微信号：275333 联系我们完成后续流程',
          showCancel: false,
          confirmColor: '#ff5a00',
          success: function () {
            console.log('1111');
            wx.navigateBack({
              delta: 1
            })
          }
        });
        
      }
    })
  }
})