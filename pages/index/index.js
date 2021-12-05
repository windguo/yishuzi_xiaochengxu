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
	ad: function () {
		let that = this;
		wx.request({
			url: getApp().globalData.roots + '/e/api/xiaochengxu/yishuzi_shengcheng/?getJson=ad&adPage=index',
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				console.log('json.data.result---', json)
				that.setData({
					contentArrayAd: json.data.result
				})
				wx.hideLoading()
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
    console.log('_scene_scene', _scene)
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
		this.ad();
    // 统计
    wx.request({
      url: getApp().globalData.roots + '/e/api/creat/get.php?getJson=countNum&token=' + getApp().globalData.token,
      method: 'GET',
      dataType: 'json',
      success: (json) => {
        this.setData({
          total: json.data.result[0].num
        })
      }
    })
    this.fetchData()
		this.getNew();
    this.getHot();
    wx.request({
      url: getApp().globalData.roots + '/shop_xiaochengxu_api/wx-sxqmsj.php?getJson=column&classid=9999',
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
	getNew: function () {
		let that = this;
		wx.request({
			url: getApp().globalData.roots + '/e/api/creat/get.php?getJson=orderByNew&token=' + getApp().globalData.token,
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				console.log('json.data.rehotArrayhotArraysult---', json)
				that.setData({
					newArray: json.data.result
				})
				wx.hideLoading()
			}
		})
	},
	getHot:function(){
			let that = this;
		console.log(getApp().globalData.roots + '/e/api/creat/get.php?getJson=orderByCreated_number&token=' + getApp().globalData.token);
			wx.request({
				url: getApp().globalData.roots + '/e/api/creat/get.php?getJson=orderByCreated_number&token=' + getApp().globalData.token,
				method: 'GET',
				dataType: 'json',
				success: (json) => {
					console.log('json.data.rehotArrayhotArraysult---', json)
					that.setData({
						hotArray: json.data.result
					})
					wx.hideLoading()
				}
			})
	},
  fetchData: function () {
    var that = this
    that.setData({
      hidden: false
    })
    let _classid = []
    let _expertListi = []
    wx.request({
      url: getApp().globalData.roots + '/e/api/creat/get.php?getJson=class&token=' + getApp().globalData.token,
      method: 'GET',
      dataType: 'json',
      success: (json) => {
        console.log('class---', json.data.result)
        for (var i = 0; i < json.data.result.length; i++) {
          _expertListi.push(i)
          _classid.push(json.data.result[i].classid)
        }
        that.setData({
          expertList: json.data.result,
          expertListi: _expertListi,
          expertListId: _classid
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
