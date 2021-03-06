// pages/wangming_shangbiao/wangming_shangbiao.js
Page({
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '来看看我生成的电话上标艺术网名 ' + this.data.result,
      imageUrl: 'https://www.yishuzi.com.cn/e/api/creat/get.php?getJson=showPic&font=1&text=生成上标下标网名&fontSize=24&width=300&height=225&fontColor=ff5a00',
      success: (res) => {
        wx.showToast({
          title: '转发成功'
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '转发失败，原因是' + res
        })
      }
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    resultFuhao: '',
    resultName: '',
    result: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '电话上标艺术网名生成'
    })
  },
  inputNameFn: function (e) {
    console.log('__inputNameFn__', e)
    this.setData({
      resultName: e.detail.value
    })
  },
  inputFuhaoFn: function (e) {
    console.log('__inputFuhaoFn__', e.detail.value)
    let _result = e.detail.value
    this.setData({
      resultFuhao: 'ᵀᴱᴸ' + _result
    })
  },
  creatName: function () {
    let __name = this.data.resultName
    if (__name == '') {
      wx.showModal({
        content: '请输入您的昵称',
        showCancel: false,
        confirmColor: '#ff5a00'
      })
    };
    let __fuhao = this.data.resultFuhao
      .replace(/0/g, '⁰')
      .replace(/1/g, '¹')
      .replace(/2/g, '²')
      .replace(/3/g, '³')
      .replace(/4/g, '⁴')
      .replace(/5/g, '⁵')
      .replace(/6/g, '⁶')
      .replace(/7/g, '⁷')
      .replace(/8/g, '⁸')
      .replace(/9/g, '⁹')
    let _results = __name + __fuhao
    this.setData({
      result: _results
    })
  },
  copyTBL: function (e) {
    console.log('wwweeee', e)
    var self = this
    wx.setClipboardData({
      data: e.currentTarget.dataset.text.trim(),
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {}
})
