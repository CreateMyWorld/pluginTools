// pages/login/login.js

var api = require("../../../utils/api.js")
var mineApi = ''


var interval = null //倒计时函数

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "", //navigateBack:返回界面   navigateTo:跳转指定界面
    pageNum: "",
    isTel: false, //是否填写正确手机号码
    isCode: false, //是否填写验证码
    isSendCode: false, //是否发送了验证码
    phone: '', //手机号码
    code: '', //验证码
    inputCode: '', //网络获取验证码
    currentTime: 60,
    countdown: "60s",
    gainCodeText: '发送验证码',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loginCode: "", // 微信wx.login登陆code
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this

    this.setData({
      type: options.type,
      pageNum: options.pageNum ? options.pageNum : ""
    })

    wx.login({  //登录
      success(res) {
        that.setData({
          loginCode: res.code
        })
      }
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
   * 获取输入的手机号码
   */
  inputPhone: function (e) {

    var tel = e.detail.value;

    if (tel.length == 11) {
      this.setData({
        phone: tel,
        isTel: true
      });
    } else {
      this.setData({
        isTel: false
      });
    }
  },

  /**
   * 获取证码
   */
  gainCode: function () {

    var that = this;

    if (this.data.isTel) {

      wx.showLoading({
        mask: true,
        title: '发送中...'
      })

      api.getLoginAuthCode({
        "mobile": this.data.phone
      }).then(res => {

        that.setData({
          isSendCode: true,
        });

        wx.showToast({
          title: "短信验证码发送成功",
          icon: 'none',
          duration: 2000
        });

        // 定时器倒计时
        var currentTime = that.data.currentTime
        interval = setInterval(function () {

          currentTime--;
          that.setData({
            countdown: currentTime + 's'
          });

          if (currentTime <= 0) {
            clearInterval(interval);
            that.setData({
              gainCodeText: '重新发送',
              currentTime: 60,
              isSendCode: false,
              countdown: "60s"
            });
          }
        }, 1000);
        // } else {
        //   wx.showToast({
        //     title: res.message,
        //     icon: 'none',
        //     duration: 2000
        //   });
        // }


      });
    }
  },

  /**
   * 获取输入的验证码
   */
  inputAuthCode: function (e) {

    var str = e.detail.value;

    this.setData({
      inputCode: str
    });
    //判断验证码长度
    if (str.length == 6) {
      this.setData({
        isCode: true
      });
    } else {
      this.setData({
        isCode: false
      });
    }
  },

  /**
   * 登录
   */
  bindLogin: function (e) {
    var that = this;

    wx.checkSession({
      success: function (data) {
        //session_key 未过期，并且在本生命周期一直有效
        that.loginSubmit();
      },
      fail: function () {
        console.log("// session_key 已经失效，需要重新执行登录流程");
        wx.showToast({
          title: "登录超时，请重新登录",
          icon: 'none',
          duration: 2000
        })
        wx.login({  //重新登录
          success(res) {
            that.setData({
              loginCode: res.code
            })
          }
        })
      }
    })
  },

  /**
   * 登录
   */
  loginSubmit: function () {
    var that = this

    if (this.data.isTel && this.data.isCode) {

      wx.showLoading({
        mask: true,
        title: '正在登录...'
      })

      api.getLogin({
        "mobile": this.data.phone,
        "securityCode": this.data.inputCode,
        "code": that.data.loginCode
      }).then(res => {
        // 已登录
        getApp().globalData.token = res.token; // 保存token
        wx.switchTab({
          url: '/pages/tabBar/home/home',
        });
      }).catch(err => {
        wx.login({  //重新登录
          success(res) {
            that.setData({
              loginCode: res.code
            })
          }
        })
      })
    }

  }

})
