Page({
    data:{
        objectArray:[]
    },
    onLoad:function(options){
			wx.showLoading({})
			wx.setNavigationBarTitle({
					title: '手写签名作品'
			});
			this.setData({
				sessionkey: wx.getStorageSync('storageSessionkey'),
				rnd: wx.getStorageSync('storageRnd'),
				userid: wx.getStorageSync('storageLoginedUserId'),
				usernames: wx.getStorageSync('storageLoginedUsernames')
			});
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
    },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '一笔签名设计,快来申请定制独一无二的签名',
			imageUrl:'https://www.yishuzi.com.cn/d/file/2019/05-10/afebf15a3288d733a0333c2e91313464.jpeg',
      path:'/pages/design/design?share=1',
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