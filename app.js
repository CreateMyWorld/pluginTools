// app.js

var timer = ''
var plugin = requirePlugin("qinlin-plugin");

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    plugin.init({
      appId: 'wx811076d46ae1ea59',
      // mode: "dev",
      openDoorPrompt: false, // 自定义开门弹窗提示,默认为false,为true调用插件自带开门弹窗提示
      faceProtocalName: "人脸识别功能协议", // 人脸隐私协议名称
      userPrivacyPolicyName: "人脸信息采集、使用授权书", // 用户隐私协议名称
      userAgreementPagePath: "/pages/home/webView/webView", // 人脸协议跳转路径
      shareMessagePagePath: "/pages/tabBar/home/home" // 访客分享跳转路径
    })
  },
  globalData: {
    userInfo: null,
    token: '',
    pluginAppid: '2d39a19ac1ae35', // 插件token
    pluginToken: '', // 插件token
    isLogin: false  // 是否登录 true:已登录   false:未登录
  },

  // 设置插件数据
  setpluginData(token) {
    

    this.globalData.pluginToken = token

    plugin.setToken(token) // 设置appid和token
   

    if (timer) {
      clearInterval(timer)
    }

    // 定时清理登录状态
    let time = 1200
    timer = setInterval(_ => {
      time = time -1
      if (time < 1) {
        this.globalData.isLogin = false
        clearInterval(timer)
      }
    }, 1000)
    
  }
})
