// pages/my/createwm/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		url:''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		wx.setNavigationBarTitle({
			title: '我的推广码',
		});
		this.setData({
			userid: wx.getStorageSync('storageLoginedUserId')
		});
		this.setData({
			url:getApp().globalData.roots + '/e/api/jianjie8_xiaochengxu/yishuzi_xiaochengxu_qrode.php?path=pages%2Fdesign%2Fdesign&scene=userid_'+ this.data.userid +'&width=100'
		})
	},
	previewImages: function (e) {
		console.log('eee', e)
		var current = e.currentTarget.dataset.src;
		wx.previewImage({
			current: current,
			urls: ['' + current + '']
		})
	}
})