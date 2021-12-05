var COMMONFN = require('../../utils/util.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		username: 'xcx',
		password: '123456',
		nickname: 'nickname',
		invite_userid:0
	},
	onLoad: function () {
		let that = this;
		wx.getUserInfo({
			success: function (_res) {
				console.log('- getUserInfo -', _res.userInfo);
				that.setData({
					username: COMMONFN.extract_chinese(_res.userInfo.nickName).substring(0, 3),
					invite_userid: wx.getStorageSync('storageInviteUserId')
				})
				that.confirmM();
			}
		})

	},
	username: function (e) {
		console.log('e.detail.valuee.detail.value', e.detail.value);
		this.setData({
			username: e.detail.value
		})
	},
	password: function (e) {
		console.log('e.detail.valuee.detail.value。password', e.detail.value);
		this.setData({
			password: e.detail.value
		})
	},
	confirmM: function (e) {
		wx.showLoading({
			title: '注册会员中'
		});
		console.log("姓名：" + this.data.username + "密码：" + this.data.password);
		// return false;
		wx.request({
			url: getApp().globalData.roots + '/e/api/yishuzi/bind.php',
			header: { 'content-type': 'application/x-www-form-urlencoded' },
			method: 'POST',
			dataType: 'json',
			data: {
				sessionkey: wx.getStorageSync('storageSessionkey'),
				username: this.data.username,
				password: this.data.password
			},
			success: (res) => {
				console.log('json.data===v--bind', res.data.status);
				if (res.data.status == 1) {
					wx.setStorageSync('storageLogined', true);
					wx.setStorageSync('storageSessionkey', res.data.sessionkey);
					wx.setStorageSync('storageRnd', res.data.rnd);
					wx.getUserInfo({
						success: function (_res) {
							console.log('- getUserInfo -', res.data);
							wx.setStorageSync('storageLoginedUsernames', res.data.result.usernames);
							wx.setStorageSync('storageRnd', res.data.result.rnd);
							wx.setStorageSync('storageLoginedavAtarUrl', _res.userInfo.avatarUrl);
							wx.setStorageSync('storageLoginedNickName', _res.userInfo.nickName);
							wx.hideLoading();
							wx.showModal({
								content: res.data.message,
								showCancel: false,
								confirmColor: '#ff5a00'
							});
						},
						fail: function () {
							console.log('failssss');
						}
					})
				} else {
					let _usernames = this.data.username + '_' + parseInt(Math.random() * 99999);
					wx.request({
						url: getApp().globalData.roots + '/e/api/yishuzi/register.php',
						header: { 'content-type': 'application/x-www-form-urlencoded' },
						method: 'POST',
						dataType: 'json',
						data: {
							sessionkey: wx.getStorageSync('storageSessionkey'),
							// invite_userid:this.data.invite_userid,
							groupid: 1,
							tobind: '0',
							Submit: '马上注册',
							enews: 'register',
							clienttype: 'xiaochengxu',
							username: _usernames,
							email: 'xcx_' + parseInt(Math.random() * 9999999999) + '@163.com',
							password: this.data.password,
							repassword: this.data.password
						},
						success: (res) => {
							console.log('res--register--000----res', res);
							wx.getUserInfo({
								success: function (_res) {
									console.log('- getUser555555Info -', _res);
									wx.setStorageSync('storageLoginedUsernames', _usernames);
									wx.setStorageSync('storageLoginedavAtarUrl', _res.userInfo.avatarUrl);
									wx.setStorageSync('storageLoginedNickName', _res.userInfo.nickName);
									wx.setStorageSync('storageSessionkey', res.data.sessionkey);
									wx.setStorageSync('storageRnd', res.data.rnd);
									wx.setStorageSync('storageLoginedUserId', res.data.userid);
									wx.hideLoading();
									wx.showModal({
										title: '恭喜【' + res.data.username + '】' + res.data.message,
										content: '5积分已经发放到【我的】,请注意查收！添加客服微信号：4742882（验证：艺术字生成）,加入微信群，与我们互动哦。',
										cancelText: '返回我的',
										confirmText: '返回首页',
										confirmColor: '#ff5a00',
										success: function (res) {
											console.log(res)
											if (res.confirm) {
												wx.switchTab({
													url: '../index/index'
												});
											} else {
												wx.switchTab({
													url: '../my/index/index'
												});
											}
										}
									})
								},
								fail: function () {
									console.log('failssss');
								}
							})
						}
					})
				}

			},
			fail: (res) => {
				console.log('fail---res', res);
			}
		})
	},
	copyTBL: function (e) {
		console.log('wwweeee', e);
		var self = this;
		wx.setClipboardData({
			data: e.currentTarget.dataset.text,
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
	},
})