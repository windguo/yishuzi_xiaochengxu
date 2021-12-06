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
		wx.request({
			url: getApp().globalData.roots + '/wxxcx/yishuzishengcheng/user/getInvite_userid?invite_userid=' + this.data.userid,
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				console.log('num---', json.data.result.num)
				that.setData({
					num: json.data.result.total
				})
				wx.hideLoading()
			}
		})
	},
	getUserInfo:function(){
		let that = this;
		wx.request({
			url: getApp().globalData.roots + '/wxxcx/yishuzishengcheng/user?userid=' + this.data.userid,
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				console.log('userinfo---', json.data.result)
				that.setData({
					info: json.data.result
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