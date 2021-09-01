// pages/home/webView/webView.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlString: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.人脸上传亲邻人脸识别功能协议  2.人脸上传亲邻人脸开门用户隐私政策
    if (options.type === '1') {
      this.setData({
        urlString: 'https://www.qinlinkeji.com/faceProtocal.html'
      })
    } else if (options.type === '2') {
      this.setData({
        urlString: 'https://www.qinlinkeji.com/faceAgreement.html'
      })
    }
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