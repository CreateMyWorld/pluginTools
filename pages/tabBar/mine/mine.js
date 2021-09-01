// pages/tabBar/mine/mine.js
var api = require("../../../utils/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    
    // 判断是否登录
    if (!getApp().globalData.isLogin) {
      wx.showLoading({
        mask: true,
        title: '加载中...'
      })
      wx.login({
        success: function (res) {
          // 判断用户是否登录
          api.checkLoginByUserCode({
            "code": res.code
          }).then(res => {
            // 结束下拉刷新
            wx.stopPullDownRefresh();
            if (res.status == '0') {
              // 设置插件数据
              getApp().setpluginData(res.plugin.token)
              getApp().globalData.isLogin = true
              getApp().globalData.token = res.token; // 保存token
            } else {
              getApp().globalData.isLogin = false
              wx.redirectTo({
                url: '/pages/login/loginView/loginView',
              })
            }
            this.setData({
              isLogin: getApp().globalData.isLogin
            })
          }).catch(err => {
          });
        },fail: function (err) {
          wx.hideLoading()
        }
      });
    } else (
      this.setData({
        isLogin: true
      })
    )
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 用户点击右上角分享
   */
  loginOut: function() {

    let that = this
    
    wx.showModal({
      title: '确定退出？',
      content: '退出后需要重新输入用户名和密码',
      cancelColor: "#666666",
      confirmColor: "#02bb00",
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.login({  //重新登录
            success(res) {
              api.getLoginOut({
                "code": res.code,
              }).then(res => {
                getApp().globalData.isLogin = false
                wx.redirectTo({
                  url: '/pages/login/loginView/loginView',
                })
              });
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})