// pages/about/about.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		url: '',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		wx.setNavigationBarTitle({
			title: '关于我们'
		});
		wx.request({
			url: getApp().globalData.roots + '/e/api/creat/get.php?getJson=groupQrode&token=' + getApp().globalData.token,
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				// console.log('___json___',json.data.result.url);
				this.setData({
					url: json.data.result.url
				})
			}
		});
	},
	previewImage: function (e) {
		wx.previewImage({
			urls: ['' + this.data.url + '']
		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})