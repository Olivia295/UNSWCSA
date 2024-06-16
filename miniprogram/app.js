// app.js
App({
    globalData: {
        navBarHeight: 0,
        menuRight: 0,
        menuTop: 0,
        menuHeight: 0,
        //用户openid
        user_openid: '',
        //用户信息
        userInfo: null
    },

    onLaunch: function () {
        const that = this;
        // 获取系统信息
        const systemInfo = wx.getSystemInfoSync();
        // 胶囊按钮位置信息
        const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
        console.log(systemInfo)
        console.log(menuButtonInfo)
        // 导航栏高度 = 状态栏高度 + 44(所有机型都适用)
        that.globalData.navBarHeight = systemInfo.statusBarHeight + 44;
        that.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
        that.globalData.menuTop = menuButtonInfo.top;
        that.globalData.menuHeight = menuButtonInfo.height;

        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力');
        } else {
            wx.cloud.init({
                // env 参数说明：
                //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
                //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
                //   如不填则使用默认环境（第一个创建的环境）
                // env: 'my-env-id',
                env: 'cloud1-8gmum2gm4045aa3a',
                traceUser: true,
            });
        }

        //调用云函数
        wx.cloud.callFunction({
            name: 'get_openId',
            success: res => {
                //获取用户openId
                this.globalData.user_openid = res.result.openid
                // console.log(this.globalData.user_openid)

                //在数据库中查找用户是否已经登录过了
                wx.cloud.database().collection('userInfo').where({
                    _openid: res.result.openid
                }).get({
                    success: result => {
                        this.globalData.userInfo = result.data[0]
                    }
                })
            }
        })

        // 启动小程序时获取用户登录信息
        const userInfo = wx.getStorageSync('user')
        if (userInfo) {
            this.globalData.userInfo = userInfo
        }
    },
    openWebView(e) {
        console.log(e.currentTarget.dataset.link)
        wx.navigateTo({
            url: '/pages/webViewPage/webViewPage?link=' + e.currentTarget.dataset.link,
        })
    },
});

// Page({
//     // 登录按钮点击事件 
//     handleLogin: function () {
//         // 调用微信登录API获取code 
//         wx.login({
//             success: res => {
//                 // 发送请求向服务器换取用户信息 
//                 wx.request({
//                     url: 'https://example.com/login', data: { code: res.code },
//                     success: res => {
//                         // 将用户信息存入缓存 
//                         wx.setStorageSync('userInfo', res.data.userInfo)
//                         // 将用户信息存到globalData中 
//                         getApp().globalData.userInfo = res.data.userInfo
//                         // 跳转到首页 
//                         wx.navigateTo({ url: '/pages/index/index' })
//                     },
//                     fail: res => {
//                         wx.showToast({ title: '登录失败', icon: 'none' })
//                     }
//                 })
//             }
//         })
//     }
// })