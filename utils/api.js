
// // 本地开发环境前缀
// var API_URL = "http://10.0.0.31:8080/api/"

// "qinlin-plugin": {
//   "version": "dev",
//   "provider": "wxa430b4cfb9826f1a"
// }

// 线上插件
// "qinlin-plugin": {
//   "version": "0.0.12",
//   "provider": "wx44be583f1a23eb0c"
// }


// 开发环境前缀
// var API_URL = "https://dev-lzzjapi.qinlinkeji.com/"

// 测试环境前缀
// var API_URL = "https://test-lzzjapi.qinlinkeji.com/"

// uat环境前缀
// var API_URL = "https://uat-lzzjapi.qinlinkeji.com/"

// 正式服前缀
var API_URL = "https://lzzjapi.qinlinkeji.com/"

function fetchApi (url, params, method, contentType) {

  let dataParams = params
  dataParams["token"] = getApp().globalData.token ? getApp().globalData.token : ''
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: dataParams,
      method: method,
      enableHttp2: true,
      header: {
        "content-type": contentType,
      },
      success: function (res) {
        wx.hideLoading()
        if (res.statusCode === 200) {
          if (res.data.code === 0) {
            resolve(res.data);
          } else if (res.data.code === 401) {
            // sessionId过期重新获取
          } else if (res.data.code === 403) {
            // wx.showModal({
            //   title: '提示',
            //   content: '您的账号在其他设备登录，请重新登录。',
            //   // cancelColor: "#666666",
            //   confirmColor: "#02bb00",
            //   // cancelText: "取消",
            //   showCancel: false,
            //   confirmText: "确定",
            //   success (res) {
            //     if (res.confirm) {
            //       getApp().globalData.sessionId = '';
            //     }
            //   }
            // })
          } else {
            reject();
            setTimeout(_ => {
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              });
            }, 50)
          }
        } else {
          reject();
          setTimeout(_ => {
            wx.showToast({
              // title: res.data.status + res.data.message,
              title: "网络请求超时，请稍后再试！",
              icon: 'none',
              duration: 2000
            });
          }, 50)
        }
      },
      fail: function (err) {
        wx.hideLoading()
        reject();
        setTimeout(_ => {
          wx.showToast({
            title: "网络连接失败，请检查您的网络",
            icon: 'none',
            duration: 2000
          });
        }, 50)
      }
      
    })
  })
}

// get请求
function fetchGetApi (url, params) {
  return fetchApi(API_URL + url, params, "GET", "application/json")
}

// post请求
function fetchPostApi (url, params) {
  return fetchApi(API_URL + url, params, "POST", "application/json")
}

module.exports = {
  
  //通过code判断用户是否登录
  checkLoginByUserCode: function (params) {
    return fetchPostApi("member/checkLogin", params).then(res => res.data)
  },

  //获取登陆验证码
  getLoginAuthCode: function (params) {
    return fetchPostApi("member/sendSecurityCode", params).then(res => res.data)
  },

  //登陆
  getLogin: function (params) {
    return fetchPostApi("member/smsLogin", params).then(res => res.data)
  },

  //微信一键登录
  getUserWxOneClickLogin: function (params) {
    return fetchPostApi("member/wxLogin", params).then(res => res.data)
  },

  //登出
  getLoginOut: function (params) {
    return fetchPostApi("member/logout", params).then(res => res.data)
  }
  
}
