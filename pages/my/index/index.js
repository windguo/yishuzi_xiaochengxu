var COMMONFN = require('../../../utils/util.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		nickname: '',
		avatarUrl: '',
		invite_userid:'',
		info:[]
	},
	onLoad: function (options) {
		COMMONFN.checkIsLogin();
		wx.setNavigationBarTitle({
			title: '我的'
		});
		this.setData({
			avatarUrl: wx.getStorageSync('storageLoginedavAtarUrl'),
			sessionkey: wx.getStorageSync('storageSessionkey'),
			rnd: wx.getStorageSync('storageRnd'),
			nickname: wx.getStorageSync('storageLoginedNickName'),
			userid: wx.getStorageSync('storageLoginedUserId'),
			invite_userid: wx.getStorageSync('storageInviteUserId')
		});
		if (this.data.userid && (this.data.userid !== 0)){
			this.getUserInfo();
			this.getInvite_userid();
		}
	},
	onShow:function(){
		console.log('onshow---my-index');
		if (this.data.userid && (this.data.userid !== 0)) {
			this.getUserInfo();
			this.getInvite_userid();
		}
	},
	getInvite_userid:function(){
		let that = this;
		console.log(getApp().globalData.roots + '/e/api/creat/get.php?getJson=getInvite_userid&invite_userid=' + this.data.userid + '&token=' + getApp().globalData.token);
		wx.request({
			url: getApp().globalData.roots + '/e/api/creat/get.php?getJson=getInvite_userid&invite_userid=' + this.data.userid + '&token=' + getApp().globalData.token,
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				console.log('num---', json.data.result.num)
				that.setData({
					num: json.data.result.num
				})
				wx.hideLoading()
			}
		})
	},
	getUserInfo:function(){
		let that = this;
		console.log(getApp().globalData.roots + '/e/api/creat/get.php?getJson=info&userid=' + this.data.userid +'&token=' + getApp().globalData.token);
		wx.request({
			url: getApp().globalData.roots + '/e/api/creat/get.php?getJson=info&userid=' + this.data.userid + '&token=' + getApp().globalData.token,
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				console.log('userinfo---', json.data.result[0])
				that.setData({
					info: json.data.result[0]
				})
				wx.hideLoading()
			}
		})
	},
	// 如何获取积分
	howGetFen:function(){
		console.log('如何获取积分');
	},
	loginout: function () {
		console.log('退出');
		wx.redirectTo({
			url: '../../loginout/loginout',
		})
	},
	copyTBL: function (e) {
		console.log('wwweeee', e);
		var self = this;
		wx.setClipboardData({
			data: e.currentTarget.dataset.text.trim(),
			success: function (res) {
				wx.getClipboardData({
					success: function (res) {
						wx.showToast({
							title: '复制成功',
						})
					}
				})
			}
		})
	}
})