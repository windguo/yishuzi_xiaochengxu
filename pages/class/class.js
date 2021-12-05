var app = getApp();
Page({
	data: {
		contentArray: [],
		expertListi: [],
		expertList: [],
		expertListId: []
	},

	onLoad: function (options) {
		wx.setNavigationBarTitle({
			title: '字体分类'
		});
		wx.showLoading({
			title: '加载中'
		})
		let _classid = [];
		let _expertListi = [];
		wx.request({
			url: getApp().globalData.roots + '/e/api/creat/get.php?getJson=class&token=' + getApp().globalData.token,
			method: 'GET',
			dataType: 'json',
			success: (json) => {
				for (var i = 0; i < json.data.result.length; i++) {
					_expertListi.push(i)
					_classid.push(json.data.result[i].classid);
				};
				this.setData({
					expertList: json.data.result,
					expertListi: _expertListi,
					expertListId: _classid
				});
				wx.hideLoading();
			}
		});

	},
	onShareAppMessage: function (res) {
		return {
			title: '网名生成的分类列表,@你来看看有喜欢的分类么',
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
	}
})
