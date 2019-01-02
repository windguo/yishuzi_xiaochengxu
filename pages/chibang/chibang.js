// pages/wangming_shangbiao/wangming_shangbiao.js
Page({
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '来看看我生成的翅膀艺术网名生成 ' + this.data.result,
      imageUrl: 'https://www.yishuzi.com.cn/e/api/creat/get.php?getJson=showPic&font=1&text=翅膀艺术网名生成&fontSize=24&width=300&height=225&fontColor=ff5a00',
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
    result: '',
    array: ['╰︶﹉⋛⋋⊱⋋๑天使๑⋌⊰⋌⋚﹉︶╯', '╰︶﹉๑天使๑﹉︶╯', '╰⋛⋋⊱⋋天使⋌⊰⋌⋚╯', '╰⋛⋋⊱๑天使๑⊰⋌⋚╯', '╰⊱⋛⋋天使⋌⋚⊰╯', '⊹⊱⋛⋋天使⋌⋚⊰⊹', '︶﹌⋛天使⋚﹌︶', '☜☞天使☜☞', '⋛⊱天使⊰⋚', '◥天使◤', '☜天使☞', 'ε天使з', '༺天使༻', 'ʚ天使ɞ'],
    objectArray: [
      {
        id: 0,
        name: '╰︶﹉⋛⋋⊱⋋๑天使๑⋌⊰⋌⋚﹉︶╯'
      },
      {
        id: 1,
        name: '╰︶﹉๑天使๑﹉︶╯'
      },
      {
        id: 2,
        name: '╰⋛⋋⊱⋋天使⋌⊰⋌⋚╯'
      },
      {
        id: 3,
        name: '╰⋛⋋⊱๑天使๑⊰⋌⋚╯'
      },
      {
        id: 4,
        name: '╰⊱⋛⋋天使⋌⋚⊰╯'
      },
      {
        id: 5,
        name: '⊹⊱⋛⋋天使⋌⋚⊰⊹'
      },
      {
        id: 6,
        name: '︶﹌⋛天使⋚﹌︶'
      }
      ,
      {
        id: 7,
        name: '☜☞天使☜☞'
      }
      ,
      {
        id: 8,
        name: '⋛⊱天使⊰⋚'
      }
      ,
      {
        id: 9,
        name: '◥天使◤'
      }
      ,
      {
        id: 10,
        name: '☜天使☞'
      },
      {
        id: 11,
        name: 'ε天使з'
      },
      {
        id: 12,
        name: '༺天使༻'
      }, {
        id: 13,
        name: 'ʚ天使ɞ'
      }
    ],
    index: 0
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '翅膀艺术网名生成'
    })
  },
  inputNameFn: function (e) {
    console.log('__inputNameFn__', e)
    this.setData({
      resultName: e.detail.value
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
    }
    let _a = this.data.array[this.data.index]
    let _results = _a.replace('天使', __name)
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
