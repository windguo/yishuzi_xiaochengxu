Page({
    data:{
        objectArray:[]
    },
    onLoad:function(){
        wx.showLoading({})
        wx.setNavigationBarTitle({
            title: '签名设计'
        });
        wx.request({
            url: 'https://jianjiexcx.92kaifa.com/e/api/creat/get.php?getJson=designList',
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
    }
})