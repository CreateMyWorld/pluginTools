# 亲邻手机开门插件

只需要一个appid和一个token！！即可打开改用户所在小区的门禁设备！！

// 在你们的wxml上这样插入开门元素
```
<qinlin-open-door token="{{token}}">

</qinlin-open-door>
```

// 在你们的json里面插入
```
"usingComponents": {
  "qinlin-open-door": "plugin://qinlin-plugin/qinlin-open-door"
}
```

// 在app.json里面引入插件，注意插件版本号填最新的版本号
```
"plugins": {
  "qinlin-plugin": {
    "version": "0.0.1",
    "provider": "wx811076d46ae1ea59"
  }
}
```

// 在app.js添加定位功能
```
var plugin = requirePlugin("qinlin-plugin");

App({
  onLaunch: function () {
    plugin.init({
      appId: 'wx44be583f1a23eb0c', // 必填
      mode: "dev", // 开发环境，非必填（默认prod）
      openDoorPrompt: false, // 自定义开门弹窗提示（默认为false）,为true时需用插件openDoorResultsChange，自定义开门弹窗提示
      faceProtocalName: "人脸识别功能协议", // 人脸隐私协议名称，非必填
      userPrivacyPolicyName: "人脸信息采集、使用授权书", // 用户隐私协议名称，非必填
      userAgreementPagePath: "/pages/userAgreement/userAgreement", // 人脸协议跳转路径，必填
      shareMessagePagePath: "/pages/index/index" // 访客分享跳转路径，非必填；如使用访客邀请功能，必填
    })

  }
})
```

// 在app.json添加定位功能
```
"permission": {
  "scope.userLocation": {
    "desc": "你的位置信息将用于小程序位置开门的效果展示"
  }
},
```

有任何疑问请联系亲邻科技软件事业部，电话:0755-23608113


## 接入方式
### 申请使用插件 appId:wx811076d46ae1ea59
首先，参见[微信官方的插件使用文档](https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/using.html)申请插件权限，在申请使用插件的使用时，填写以下appid:wx811076d46ae1ea59

### 引入插件代码
参见[官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/using.html)与[示例项目](https://github.com/CreateMyWorld/pluginTools)，尽量使用最新版本插件，，如有问题，可在github提交[issues](https://github.com/CreateMyWorld/pluginTools/issues)或致电:0755-23608113

### 使用亲邻开门组件
wxml

```
<qinlin-open-door 
token="wxmini:2c9a19597b1000fa017b4d0112bb7bd8"  // 可使用token="{{token}}" wx:if="{{token}}" 的方式应用data变量,要注意确保token存在>
```

```
// 支持部分UI自定义，用于在开门插件上显示UI
<qinlin-open-door 
token="wxmini:2c9a19597b1000fa017b4d0112bb7bd8"
backgroundImage= 'url(https://file.qinlinad.com/qinlin-open-plus/pics/bg.png)'    //自定义开门插件背景图片 702*685
commonDoorImage= "/images/commonDoorImage.png"    //自定义开门主按钮图片 260*260
doorImage= "/images/doorImage.png"    //自定义开门按钮图片 115*115
editImage= "/images/editImage.png"    //自定义编辑按钮图片  115*115
bind:openDoorResultsChange="openDoorResultsChange" // 自定义开门弹窗提示, openDoorPrompt为true时需用插件openDoorResultsChange，自定义开门弹窗提示
bind:whetherCommunityAuthority="userIsAuthority" // 用户是否有权限结果回调  detail: true：有小区权限  false：无小区权限 
>
```

组件元素支持的自定义属性：

* `token` token，对接亲邻科技后台api提供，对接前请与由亲邻科技有限公司洽谈

* `backgroundImage` 开门插件背景图片

* `commonDoorImage` 常用门禁按钮图片

* `doorImage` 门禁按钮图片

* `editImage` 编辑按钮图片


组件元素抛出的自定义事件

* `openDoorResultsChange` 组件开门结果回调方法（可选是否调用，当config.openDoorPrompt=true,必须要调用该方法）,detail.status // 开门状态      detail.message // 开门状态注解

* `userIsAuthority` 用户是否有权限结果回调 // detail: true：有小区权限  false：无小区权限 



### 插件 js api

```
var plugin = requirePlugin("qinlin-plugin");

plugin.init({
  appId: 'wx44be583f1a23eb0c', // 必填
  mode: "dev", // 开发环境，非必填（默认prod）
  openDoorPrompt: false, // 自定义开门弹窗提示（默认为false）,为true时需用插件openDoorResultsChange，自定义开门弹窗提示
  faceProtocalName: "人脸识别功能协议", // 人脸隐私协议名称，非必填
  userPrivacyPolicyName: "人脸信息采集、使用授权书", // 用户隐私协议名称，非必填
  userAgreementPagePath: "/pages/userAgreement/userAgreement", // 人脸协议跳转路径，必填
  shareMessagePagePath: "/pages/index/index" // 访客分享跳转路径，非必填；如使用访客邀请功能，必填
})

//手动操作开门

plugin.setToken(token) // 设置token


 // 扫码开门接口
plugin.scanfQrCodeOpenDoor(macAddress).then(res => { 
  console.log(res.status); // 开门状态
  console.log(res.message); // 开门状态注解
  console.log(res.doorControlName); // 门禁名称

  if (res.status == 5) { // 用户无开门权限，跳转到申请权限页面
    wx.navigateTo({
      url: 'plugin-private://wx811076d46ae1ea59/pages/applyForPermission/authOne/authOne?cityCode=' + res.cityCode + "&cityName=" + res.cityName + "&communityId=" + res.communityId + "&communityName=" + res.communityName
    })
  }
})

// 跳转到访客核验页面  (访客扫描邀请码跳转页面,uuid 为扫码访客邀请码得到的参数code）
  wx.navigateTo({
    url: 'plugin-private://wx811076d46ae1ea59/pages/visitors/enterVisitorInformation/enterVisitorInformation?uuid=' + code,
  })

// 跳转到访客邀请页面
  plugin.checkCommunityVisitor().then(res => {
    if (res) {
      wx.navigateTo({
        url: 'plugin-private://wx811076d46ae1ea59/pages/visitors/guestAuthorization/guestAuthorization',
      })
    } else {
      wx.showToast({
        title: "该小区未开通访客邀请功能",
        icon: 'none',
        duration: 2000
      });
    }        
  })


// 跳转到我的小区页面
  wx.navigateTo({
    url: 'plugin-private://wx811076d46ae1ea59/pages/mine/myDistrict/myDistrict',
  })

// 跳转到申请记录页面
  wx.navigateTo({
    url: 'plugin-private://wx811076d46ae1ea59/pages/mine/applicationRecord/applicationRecord',
  })
```




### 版本功能迭代

V0.0.1
* 一键对接开门功能
* 支持扫码开门
* 支持自定义开门结果弹窗提示
* 支持访客邀请


### 常见问题
1.调用扫码开门scanfQrCodeOpenDoor时，要先调用setToken来设置token,不然无法开门

2.跳转到自定义用户协议页面时，会携带参数type，可以在设置的页面的onLoad方法里获取type

js
```
  data: {
    urlStr: ''
  },

  onLoad: function(options) {
    // 1.人脸上传亲邻人脸识别功能协议  2.人脸上传亲邻人脸开门用户隐私政策
    if (options.type === '1') {
      this.setData({
        urlStr: 'https://www.qinlinkeji.com/faceProtocal.html'
      })
    } else if (options.type === '2') {
      this.setData({
        urlStr: 'https://www.qinlinkeji.com/faceAgreement.html'
      })
    }
  },
```

wxml
```
<view>
  <web-view src='{{urlStr}}'></web-view>
</view>
```

### tips
1.init(),必须调用改方法初始化插件，设置用户协议跳转页面，其他参数可用可不用，根据个人需求可选择性配置
```
"appId:: 'wx44be583f1a23eb0c', // 必填
"mode": "dev", // 开发环境，非必填（默认prod）
"openDoorPrompt" // 默认值为false
"faceProtocalName" // 人脸隐私协议 默认名称:"人脸识别功能协议"
"userPrivacyPolicyName" // 用户隐私政策默认名称:"人脸开门用户隐私政策"
"userAgreementPagePath"  // 无默认路径，由于插件不支持web-view组件，所以需要接入者自行设置协议路径，否则无法展示协议内容
"shareMessagePagePath"  // 无默认路径，用户可以通过访客邀请分享链接跳转到接入者小程序，所以需要接入者自行设置协议路径，否则无法展示协议内容

```

2.scanfQrCodeOpenDoor(),扫码开门需要自己编写弹窗提示，插件暂时无法提供扫码开门弹框提示


3.const plugin = requirePlugin("qinlin-plugin"); 可以打印plugin，插件暴露的接口都在这里面



### Q&A
Q. 谁不能使用这个插件?
A. 非亲邻科技有限公司合作者，不能使用开门插件，即使使用了，无法执行开门操作，按理说提审会被拒绝

