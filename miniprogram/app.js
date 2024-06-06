// app.js
App({
    globalData: {
		navBarHeight: 0,
        menuRight: 0,
        menuTop: 0,
        menuHeight: 0
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
        env:'cloud1-8gmum2gm4045aa3a',
        traceUser: true,
      });
    }


  }
});

