//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner_image: null,
    girls: [],
    girls_page_num: 1
  },

  go_banner_detail: function (options) {
    console.log(options.currentTarget.dataset.url)
    wx.navigateTo({
      url: '/pages/webpage/web_detail?url=' + options.currentTarget.dataset.url
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://gank.io/api/v2/banners',
      complete: (res) => {
        console.log('complete:' + res)
      },
      fail: (res) => {
        console.log('fail:' + res)
      },
      success: (result) => {
        console.log('success:' + result.data.data)
        that.setData({
          banner_image: result.data.data
        })
      },
    })
    wx.request({
      url: 'https://gank.io/api/v2/data/category/Girl/type/Girl/page/1/count/10',
      success: (result) => {
        console.log('result' + result)
        that.setData({
          girls: result.data.data
        })
      },
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

  preview_girl_image: function (event) {
    var that = this;
    var src = event.currentTarget.dataset.url; //获取data-src
    var imgList = []
    for (var i = 0; i < that.data.girls.length; i++) {
      imgList.push(that.data.girls[i].url)
    }
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom')
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    var pageNum = that.data.girls_page_num + 1
    wx.request({
      url: 'https://gank.io/api/v2/data/category/Girl/type/Girl/page/' + pageNum + '/count/10',
      success: (result) => {
        console.log('result' + result)
        var girls_expand = that.data.girls
        for (var i = 0; i < result.data.data.length; i++) {
          girls_expand.push(result.data.data[i])
        }
        that.setData({
          girls: girls_expand
        })
        wx.hideLoading()
      },
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})