// pages/login/loginView/loginView.js

var api = require("../../../utils/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "", //navigateBack:返回界面   navigateTo:跳转指定界面
    pageNum: "",
    loginCode: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    this.setData({
      type: options.type,
      pageNum: options.type ? options.type : ""
    })

    wx.login({  //重新获取登录code
      success(res) {
        that.setData({
          loginCode: res.code
        })
      }
    })

    // wx.login({
    //   success(data) {
    //     //判断用户是否授权获取头像、昵称
    //     api.getIsAuthUserInfo({
    //       "code": data.code
    //     }).then(res => {
    //       wx.hideLoading();
    //       that.setData({
    //         isRefresh: false
    //       })
    //       // 判断是否授权获取头像昵称
    //       if (res) {// 已授权
    //         wx.login({  //重新获取登录code
    //           success(res) {
    //             that.setData({
    //               loginCode: res.code
    //             })
    //           }
    //         })
    //       } else {// 未授权
    //         that.userInfoAuthRemind.showUserInfoAuthRemind()
    //       }
    //     }).catch(err => {
    //     });
    //   },
    //   fail(err) {
        
    //   }
    // })
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
   * 授权完成，显示登录界面
   */
  isShowLogin: function () {
    var that = this;
    wx.login({  //重新获取登录code
      success(res) {
        that.setData({
          loginCode: res.code
        })
      }
    })
  },

  /**
   * 获取用户手机号码
   */
  getPhoneNumber: function (e) {

    var that = this;

    if (e.detail.encryptedData) {
      wx.checkSession({
        success: function (data) {
          //session_key 未过期，并且在本生命周期一直有效

          console.log("session_key 未过期，并且在本生命周期一直有效");

          that.wxOneClickLogin(e);

        },
        fail: function () {
          // session_key 已经失效，需要重新执行登录流程
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
    }
  },

  /**
   * 微信一键登录
   */
  wxOneClickLogin: function (e) {
    
    var that = this;

    wx.showLoading({
      mask: true,
      title: '正在登录...'
    })
    
    api.getUserWxOneClickLogin({
      "code": this.data.loginCode,
      "encryptedData": e.detail.encryptedData,
      "iv": e.detail.iv
    }).then(res => {
      // // 已登录
      // getApp().globalData.sessionId = res.sessionId; // 保存sessionId

      // // privacyAgreement 0 需要提示 1不需要提示
      // if (res.privacyAgreement == '0') {
      //   // 同意服务隐私政策
      //   mineApi.userAgreePrivacy({"privacyAgreement": '1'} ).then(res => {
      //   })
      // }
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
  },

  /**
   * 手机号码登录
   */
  phoneLogin: function (e) {
    
    wx.navigateTo({
      url: '/pages/login/login/login?type=' + this.data.type + "&pageNum=" + this.data.pageNum,
    })
  },


  /**
  * 查看协议
  */
  lookAgreement: function () {
    wx.navigateTo({
      url: '/pages/login/userAgreement/userAgreement?type=1',
    });
  },

  // 查看隐私政策
  lookPrivacy() {
    wx.navigateTo({
      url: '/pages/login/userAgreement/userAgreement?type=4',
    });
  },

  
})