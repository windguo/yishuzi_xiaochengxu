Component({
  data:{
    newShopArray:[]
  },
  attached: function () {
    this.getListData()
  },
  methods: {
    getListData: function () {
      let that = this
      wx.request({
        url: getApp().globalData.aishouxie_roots + '/wxxcx/shop/index',
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
  }
})