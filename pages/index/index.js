const app = getApp()
Page({
  data: {
    objectArray:[],
    tabIndex:0,
    hidden: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
		contentArrayAd: [],
		hotArray:[],
    total: 239,
		avatarUrl:'',
		sessionkey: '',
		rhidden:'',
		rnd: '',
		height: app.globalData.height * 2 + 25,
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		nvabarData: {
			// 设置为true，显示左侧按钮
			showCapsule: true,
			// 返回首页icon
			home: true,
			// 返回上一页icon
			back: false,
			// 中间文字
			title: '艺术字生成'
		},
		textData: {
			title: '我是首页的tips',
			icon: 'warn_light'
		}
  },
  gifHidden: function () {
    this.setData({
      hidden: true
    })
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
	// 更新分享次数
	upShareNumber: function (userid) {
		console.log('updateShareNumer');
		console.log({
			sessionkey: this.data.sessionkey,
			ecmsfrom: 'xiaochengxu',
			userid: userid,
			username: this.data.usernames,
			rnd: this.data.rnd
		});
		let that = this;
		wx.request({
			url: getApp().globalData.roots + '/e/api/creat/get.php?getJson=upShareNumber&token=' + getApp().globalData.token,
			data: {
				sessionkey: this.data.sessionkey,
				ecmsfrom: 'xiaochengxu',
				userid: userid,
				username: this.data.usernames,
				rnd: this.data.rnd
			},
			header: { 'content-type': 'application/x-www-form-urlencoded' },
			method: 'POST',
			dataType: 'json',
			success: (json) => {
				console.log('upShareNumber---ok');
			}
		})
	},
  onLoad: function (options) {
    wx.showLoading({});
    let that = this
    // 扫码进入的判断开始
    const _scene = options.scene
    console.log('_scene_', _scene)
    if (Boolean(_scene) == true) {
      if (_scene.indexOf('start_') == 0) {
        let __scene = _scene.substring(6)
        console.log('__scene', __scene)
        wx.switchTab({
          url: '../' + __scene + '/' + __scene
        })
			} else if(_scene.indexOf('userid_') == 0) {
				let __scene = _scene.substring(7)
				console.log('__scene', __scene);
				wx.setStorageSync('storageInviteUserId', __scene);
				this.upShareNumber(__scene);
			} else if (_scene.indexOf('classid-') == 0) {
        let _ar = _scene.split('_')
        let _classid = _ar[0].split('-')
        let _id = _ar[1].split('-')
        let _channel = _id[0]
        switch (_channel) {
          case 'duanziid':
            wx.navigateTo({
              url: '../duanzi_detail/duanzi_detail?classid=' + _classid[1] + '&id=' + _id[1]
            })
            break
          default:
            break
        }
      }
    }
		// 扫码进入的判断结束
    this.getNew();
    this.getHot();
    this.getAishouxieListData();
  },
	getNew: function () {
		let that = this;
		wx.request({
			url: getApp().globalData.roots + '/wxxcx/yishuzishengcheng/lists/orderbynew',
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				that.setData({
					newArray: json.data.result
				})
				wx.hideLoading()
			}
		})
	},
	getHot:function(){
			let that = this;
			wx.request({
				url: getApp().globalData.roots + '/wxxcx/yishuzishengcheng/lists/orderByCreated_number',
				method: 'GET',
				dataType: 'json',
				success: (json) => {
					that.setData({
						hotArray: json.data.result
					})
					wx.hideLoading()
				}
			})
	},
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  changeTab(i){
    console.log('.....i....',i.currentTarget.dataset.id)
    this.setData({
      tabIndex:i.currentTarget.dataset.id
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '新发现的艺术字生成和签名设计的小程序,赶紧来看看',
      // path:'/',
      imageUrl: '../../indexPic.png',
      success: (res) => {
        wx.showToast({
          content: '分享成功'
        })
      },
      fail: (res) => {
        wx.showToast({
          content: '分享失败,原因是' + res
        })
      }
    }
  }
})
