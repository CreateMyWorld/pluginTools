
function e(t) {
  return e = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ?
  function(e) {
      return typeof e
  }: function(e) {
      return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
  },
  e(t)
}
function t(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
  }) : e[t] = n,
  e
}
function n(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t && (r = r.filter((function(t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable
      }))),
      n.push.apply(n, r)
  }
  return n
}
function r(e) {
  for (var r = 1; r < arguments.length; r++) {
      var o = null != arguments[r] ? arguments[r] : {};
      r % 2 ? n(Object(o), !0).forEach((function(n) {
          t(e, n, o[n])
      })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)) : n(Object(o)).forEach((function(t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(o, t))
      }))
  }
  return e
}
function o(e, t) {
  return a(e) || i(e, t) || c()
}
function a(e) {
  if (Array.isArray(e)) return e
}
function i(e, t) {
  if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) {
      var n = [],
      r = !0,
      o = !1,
      a = void 0;
      try {
          for (var i, c = e[Symbol.iterator](); ! (r = (i = c.next()).done); r = !0) if (n.push(i.value), t && n.length === t) break
      } catch(e) {
          o = !0,
          a = e
      } finally {
          try {
              r || null == c.
              return || c.
              return ()
          } finally {
              if (o) throw a
          }
      }
      return n
  }
}
function c() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance")
}
var s = "https://qidianmp.jd.com",
u = "".concat(s, "/getAppInfo/"),
p = {
  app: "i",
  page: "p",
  event: "e"
},
f = "HXDO6m",
g = ["pin", "openId", "unionId"],
l = "qidian_",
h = {
  getSessionId: function() {
      var e, t = this.getStorage("sid");
      if (t) {
          var n = t.split("-"),
          r = n.length;
          n[r - 1] = parseInt(n[r - 1], 10) + 1,
          e = n.join("-"),
          this.setStorage("sid", e)
      } else e = "".concat(y.makeId(20), "-1"),
      this.setStorage("sid", e);
      return e
  },
  getSystemInfo: function() {
      var e = {};
      try {
          var t = wx.getSystemInfoSync();
          e = {
              mct: t.brand,
              dvc: t.model,
              osp: t.platform,
              osv: t.system,
              scr: t.pixelRatio,
              apv: t.version,
              mnv: t.SDKVersion,
              scw: t.screenWidth,
              sch: t.screenHeight,
              winw: t.windowWidth,
              winh: t.windowHeight,
              sbh: t.statusBarHeight,
              lang: t.language,
              fsiz: t.fontSizeSetting
          }
      } catch(t) {
          y.logger(t),
          e = {}
      }
      return e
  },
  getLaunchOptions: function() {
      if (wx.getLaunchOptionsSync) {
          var e = wx.getLaunchOptionsSync();
          return {
              scene: e.scene,
              path: e.path
          }
      }
      return {}
  },
  setStorage: function(e, t) {
      try {
          wx.setStorageSync(l + e, t)
      } catch(e) {
          y.logger(e)
      }
  },
  getStorage: function(e) {
      var t = "";
      try {
          t = wx.getStorageSync(l + e)
      } catch(e) {
          return y.logger("从本地缓存中取数据失败", e),
          ""
      }
      return t
  },
  getNetworkType: function() {
      return new Promise((function(e, t) {
          wx.getNetworkType({
              success: function(t) {
                  e(t.networkType)
              },
              fail: function() {
                  y.logger("获取网络类型失败"),
                  e("")
              }
          })
      }))
  },
  networkChange: function(e) {
      wx.onNetworkStatusChange((function(t) {
          e(t.networkType)
      }))
  },
  getPageInfo: function() {
      var e = getCurrentPages(),
      t = e.length,
      n = t >= 1 ? e[t - 1].route: "",
      r = t >= 2 ? e[t - 2].route: "";
      return {
          url: n,
          rp: r || n
      }
  },
  getSetting: function() {
      return new Promise((function(e) {
          wx.getSetting({
              success: function(t) {
                  e(t.authSetting)
              },
              fail: function() {
                  y.logger("获取用户的当前设置出错"),
                  e()
              }
          })
      }))
  },
  getUserInfo: function(e) {
      var t = this;
      return new Promise((function(n) {
          t.getSetting().then((function(t) {
              e && t && t["scope.userInfo"] || n({}),
              wx.getUserInfo({
                  success: function(e) {
                      var t = e || {},
                      r = t.userInfo,
                      o = void 0 === r ? {}: r,
                      a = o.city,
                      i = o.country,
                      c = o.gender,
                      s = o.province;
                      n({
                          city: a,
                          country: i,
                          gender: c,
                          prov: s
                      })
                  },
                  fail: function() {
                      y.logger("获取用户信息出错"),
                      n({})
                  }
              })
          }))
      }))
  },
  getLocation: function(e) {
      var t = this;
      return new Promise((function(n) {
          e ? t.getSetting().then((function(e) {
              e["scope.userLocation"] ? wx.getLocation({
                  type: "wgs84",
                  success: function(e) {
                      var t = "".concat(e.longitude, "|").concat(e.latitude);
                      n(t)
                  },
                  fail: function() {
                      y.logger("获取地理位置信息出错"),
                      n("-")
                  }
              }) : n("-")
          })) : n("-")
      }))
  },
  getTitle: function(e) {
      var t = "";
      if (__wxConfig.tabBar && (__wxConfig.tabBar.list.find((function(n) {
          return n.pathPath !== e && n.pagePath !== "".concat(e, ".html") || n && n.text && (t = n.text),
          !0
      })), 0 === t.length)) {
          var n = __wxConfig.page[e] || __wxConfig.page["".concat(e, ".html")];
          t = n && n.window.navigationBarTitleText ? n.window.navigationBarTitleText: __wxConfig.global.window.navigationBarTitleText
      }
      return t
  },
  request: function(e, t, n, r) {
      if ("secret" === e) {
          var o = y.compile(t, n);
          return y.logger("appId", o),
          new Promise((function(e, t) {
              wx.request({
                  url: u + encodeURIComponent(o),
                  method: "GET",
                  success: function(t) {
                      e(t && t.data || {})
                  },
                  fail: function() {
                      e({})
                  }
              })
          }))
      }
      var a = y.compile(JSON.stringify(r), n);
      y.logger("req", e, r),
      wx.request({
          url: "".concat(s, "/").concat(p[e]),
          data: {
              appKey: t,
              data: a
          },
          method: "POST"
      })
  }
},
d = r({},
h),
y = {
  makeId: function(e) {
      for (var t = ""; t.length < e;) t += Math.random().toString(36).substr(2);
      return "".concat((new Date).getTime().toString(36), "-").concat(t.substr(0, e)).toLocaleUpperCase()
  },
  makeKey: function(e) {
      if (!e) return 0;
      for (var t = 0,
      n = 0; n < e.length; n += 1) t += e.charCodeAt(n);
      return t %= 1e3,
      t
  },
  compile: function() {
      for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 ? arguments[1] : void 0, n = String.fromCharCode(e.charCodeAt(0) + t), r = 1; r < e.length; r += 1) n += String.fromCharCode(e.charCodeAt(r) + e.charCodeAt(r - 1));
      return escape(n)
  },
  unCompile: function(e, t) {
      for (var n = unescape(e), r = String.fromCharCode(n.charCodeAt(0) - t), o = 1; o < n.length; o += 1) r += String.fromCharCode(n.charCodeAt(o) - r.charCodeAt(o - 1));
      return r
  },
  joinJson: function(e) {
      if ("Object" === e.constructor.name) return e;
      for (var t = e[0], n = function(n) {
          var r = Object.keys(e[n]);
          r.forEach((function(r) {
              t[r] = e[n][r]
          }))
      },
      r = e.length - 1; r > 0; r -= 1) n(r);
      return t
  },
  logger: function() {
      if ("enable" === d.getStorage("dev") && "object" === ("undefined" === typeof console ? "undefined": e(console)) && console.log) try {
          var t; (t = console).log.apply(t, arguments)
      } catch(e) {
          console.log(arguments.length <= 0 ? void 0 : arguments[0])
      }
  }
},
v = Object.prototype.hasOwnProperty,
m = {
  seq: 0,
  shareId: 0
},
w = !1,
b = !1,
S = {};
function I() {
  return m.appKey && m.appSecret ? (m.reqKey || (m.reqKey = y.makeKey(m.appSecret) || 0), Promise.resolve()) : d.request("secret", m.appId, y.makeKey(f) || 0).then((function(e) {
      var t = e.code,
      n = e.data,
      r = void 0 === n ? {}: n;
      if ("1000" === t) {
          var o = r.appKey,
          a = r.secret,
          i = r.appName;
          m.appKey = o,
          m.appSecret = a,
          m.appName = i,
          m.reqKey = y.makeKey(a) || 0
      }
  }))
}
function O() {
  return w && m.appKey && m.appSecret ? Promise.resolve() : Promise.all([d.getNetworkType(), d.getUserInfo(m.userInfo), d.getLocation(m.location), I()]).then((function(e) {
      var t = o(e, 3),
      n = t[0],
      r = void 0 === n ? "none": n,
      a = t[1],
      i = void 0 === a ? {}: a,
      c = t[2],
      s = void 0 === c ? "": c;
      m.net = r,
      Object.assign(m, i),
      m.loc = s,
      w = !0
  }))
}
function x(e) {
  return e && g.forEach((function(t) {
      v.call(e, t) && "" !== e[t] && (m[t] = e[t], d.setStorage(t, e[t]))
  })),
  O().then((function() {
      return {
          sessionId: m.sid || "",
          appId: m.appId || "",
          appKey: m.appKey || "",
          pin: m.pin || "",
          openId: m.openId || "",
          unionId: m.unionId || "",
          ex1: e && v.call(e, "ex1") ? e.ex1: "",
          ex2: e && v.call(e, "ex2") ? e.ex2: "",
          ex3: e && v.call(e, "ex3") ? e.ex3: "",
          ctm: (new Date).getTime()
      }
  }))
}
function j(e, t) {
  Object.keys(e).forEach((function(n) {
      n in t && (t[n] = e[n], n in g && d.setStorage(n, e[n]))
  }))
}
function P(e) {
  var t = {
      param: {}
  };
  return t.ex1 = m.shareId,
  Object.keys(e).forEach((function(n) {
      return "function" !== typeof e[n] && ("title" === n ? t.ex2 = e[n] : "path" === n ? t.ex3 = e.path: t.param[n] = e[n], !1)
  })),
  t
}
function C() {
  m.seq += 1
}
function k() {
  m.shareId += 1
}
function K() {
  var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
  t = !1,
  n = d.getPageInfo(),
  r = n.url,
  o = n.rp;
  e ? t = !0 : !0 !== S[r] && (t = !0),
  t && (m.url = r, m.rp = o, S[r] = !0, m.tle = d.getTitle(r))
}
function q() {
  d.networkChange((function(e) {
      m.net = e
  }))
}
function T(t) {
  "object" === e(t) && Object.keys(t).forEach((function(e) {
      m[e] = t[e],
      e in g && d.setStorage(e, t[e]),
      "dev" === e && d.setStorage("dev", e ? "enable": "disable")
  }))
}
function A() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
  if (!b) {
      b = !0;
      var t = e.appId,
      n = e.userInfo;
      if (t) {
          T(e),
          n || (e.userInfo = !0),
          q();
          var o = d.getSessionId();
          m.sid = o;
          var a = d.getSystemInfo();
          if (Object.assign(m, a), e.autoReport) {
              var i = r({},
              e),
              c = ["appName", "appId", "appKey", "appSecret", "reqKey", "appSecret", "dev", "location", "userInfo", "autoReport"];
              c.forEach((function(e) {
                  delete i[e]
              })),
              _(i)
          }
      } else y.logger("请传入 appId")
  }
}
function _(e) {
  var t = d.getLaunchOptions(),
  n = t.scene,
  r = t.path;
  x(e).then((function(t) {
      var o = {
          appName: m.appName || "",
          loc: m.loc || "",
          gender: m.gender || "",
          city: m.city || "",
          prov: m.prov || "",
          country: m.country || "",
          spath: r || "",
          src: n || "",
          net: m.net || "",
          osv: m.osv || "",
          osp: m.osp || "",
          dvc: m.dvc || "",
          mct: m.mct || "",
          scr: m.scr || "",
          apv: m.apv || "",
          phn: m.phn || "",
          scw: m.scw || "",
          sch: m.sch || "",
          winw: m.winw || "",
          winh: m.winh || "",
          sbh: m.sbh || "",
          lang: m.lang || "",
          fsiz: m.fsiz || ""
      };
      Object.assign(o, t),
      e && j(e, o),
      d.request("app", m.appKey, m.reqKey, o)
  }))
}
function E(e) {
  C(),
  K(!0),
  x(e).then((function(t) {
      var n = {
          seq: m.seq,
          url: m.url,
          referPath: m.rp || "-",
          tle: m.tle
      };
      Object.assign(n, t),
      e && j(e, n),
      d.request("page", m.appKey, m.reqKey, n)
  }))
}
function D(e, t) {
  x(t).then((function(n) {
      var r = {
          typ: e,
          url: m.url,
          eid: t.eid || "",
          ela: t.ela || "",
          eli: t.eli || "",
          param: JSON.stringify(t.param) || ""
      };
      Object.assign(r, n),
      d.request("event", m.appKey, m.reqKey, r)
  }))
}
function N() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
  t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
  n = {},
  o = r({},
  t);
  switch (e) {
  case "share":
      k(),
      n = P(o),
      D("share_0", n);
      break;
  case "success":
      n.ex1 = m.shareId,
      n.param = o,
      D("share_1", n);
      break;
  case "fail":
      n.ex1 = m.shareId,
      n.param = o,
      D("share_2", n);
      break
  }
}
var L = {
  setData: T,
  init: A,
  startApp: _,
  startPage: E,
  startEvent: D,
  startShare: N
},
B = {
  setData: function(e) {
      L.setData(e)
  },
  init: function(e) {
      L.init(e)
  },
  startApp: function(e) {
      L.startApp(e)
  },
  startPage: function(e) {
      L.startPage(e)
  },
  startEvent: function(e, t) {
      L.startEvent(e, t)
  },
  startShare: function(e, t) {
      L.startShare(e, t)
  }
};
export
default B;