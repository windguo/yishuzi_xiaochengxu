const app = getApp()
Component({
	options: {
		addGlobalClass: true,
	},
	properties: {
		textData: {   //textData   由父页面传递的数据，变量名字自命名
			type: Object,
			value: {},
			observer: function (newVal, oldVal) { }
		}
	},
	data: {
		infos:{},
		todayUpdate: 0,
		total: 0,
		snewstime: '',
		registertime: '',
		todayRegister:'',
		userid: '',
		username: '',
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		height: '',
		member_newArray:[],
		//默认值  默认显示左上角
		textData: {
			showCapsule: 1
		}
	},
	attached: function () {
		this._reloadData();
	},
	methods: {
		// 返回上一页面
		_navback() {
			wx.navigateBack()
		},
		//返回到首页
		_backhome() {
			wx.switchTab({
				url: '/pages/index/index',
			})
		},
		_reloadData(){
			let that = this;
			//统计数据
			wx.request({
				url: getApp().globalData.roots + '/wxxcx/yishuzishengcheng/total',
				method: 'GET',
				dataType: 'json',
				success: (json) => {
					this.setData({
						infos: json.data.result
					})
				}
			});
		}
	}
}) 