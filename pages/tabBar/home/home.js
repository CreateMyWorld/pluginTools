// pages/tabBar/home/home.js

var api = require("../../../utils/api.js")
var plugin = requirePlugin("qinlin-plugin");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverList: [{
      "image": "/images/img_home_server_001.png",
      "title": "访客授权",
      "type": "0"
    },{
      "image": "/images/img_home_server_002.png",
      "title": "我的小区",
      "type": "1"
    },{
      "image": "/images/img_home_server_003.png",
      "title": "申请记录",
      "type": "2"
    }],
    isShowVisitor: false,
    options: {
      "type": '1',
      "code": 'FC19FA000176'
    },
    token: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onPullDownRefresh()

    if (options.type && options.type != "undefined") {
      this.setData({
        options: options
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

    if (!getApp().globalData.isLogin) {
      let that = this
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
              plugin.setToken(res.plugin.token) // 设置appid和token

              getApp().globalData.isLogin = true
              getApp().globalData.token = res.token; // 保存token

              that.setData({
                token: res.plugin.token
              })
              
              // 扫码开门
              if (that.data.options.type == '1') {
                plugin.scanfQrCodeOpenDoor(that.data.options.code).then(res => { 
                  console.log(res.status); // 开门状态
                  console.log(res.message); // 开门状态注解
                  console.log(res.doorControlName); // 门禁名称
                
                  if (res.status == 5) { // 用户无开门权限，跳转到申请权限页面
                    wx.navigateTo({
                      url: 'plugin-private://wx811076d46ae1ea59/pages/applyForPermission/authOne/authOne?cityCode=' + res.cityCode + "&cityName=" + res.cityName + "&communityId=" + res.communityId + "&communityName=" + res.communityName
                    })
                  }
                }) 
              }

              // 扫描邀请码，打开邀请信息页
              if ( that.data.options.type == '11') {
                let code  =  that.data.options.code
          
                that.setData({
                  options: {
                    "type": '',
                    "code": ''
                  }
                })
          
                wx.navigateTo({
                  url: 'plugin-private://wx811076d46ae1ea59/pages/visitors/enterVisitorInformation/enterVisitorInformation?uuid=' + code,
                })
              }

              that.checkShareVisitor()
            }
          }).catch(err => {
          });
        },fail: function (err) {
          wx.hideLoading()
        }
      });
    } else {
      this.checkShareVisitor()
    }
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

  },

  /**
   * 访客邀请分享链接检查
   */
  checkShareVisitor: function () {

    plugin.navigateToGuestAuthorization().then(res => {
      if (res) {
        this.setData({
          isShowVisitor: true
        })
      } else {
        this.setData({
          isShowVisitor: false
        })
      }        
    })
  },


  /**
   * 选择小区服务
   */
  selectCommunityServer: function (e) {

    let type = e.currentTarget.dataset.type

    if ( type == '0' || type == '1' || type == '2' ) {

      if (getApp().globalData.isLogin) {
        if (type == '0') {
          wx.navigateTo({
            url: 'plugin-private://wx811076d46ae1ea59/pages/visitors/guestAuthorization/guestAuthorization',
          })
        } else if (type == '1') {
          wx.navigateTo({
            url: 'plugin-private://wx811076d46ae1ea59/pages/mine/myDistrict/myDistrict',
          })
        } else if (type == '2') {
          wx.navigateTo({
            url: 'plugin-private://wx811076d46ae1ea59/pages/mine/applicationRecord/applicationRecord',
          })
        }
      } else {
        wx.navigateTo({
          url: '/pages/login/loginView/loginView',
        })
      }
    }
  },

  //组件开门结果回调方法（当初始化配置里openDoorPrompt为true时，调用该方法）
  openDoorResultsChange: function (e) {
    console.log(e.detail)
    console.log(e.detail.status); // 开门状态
    console.log(e.detail.message); // 开门状态注解
  },
  
  /**
   * 判断用户是否有当前小区的权限
   */
  userIsAuthority: function (e) {
    if (e.detail) {
      console.log("有小区权限")
    } else {
      console.log("没有小区权限")
    }
  } 
  
})