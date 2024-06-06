// components/customNavBar/customNavBar.js
Component({
    properties: {
        // defaultData（父页面传递的数据）
        title: {
            type: String,
            value: "我是默认标题",
            observer: function (newVal, oldVal) {}
        }
    },
	data: {
		navBarHeight: wx.getSystemInfoSync().statusBarHeight+44, 
        menuRight:wx.getSystemInfoSync().screenWidth - wx.getMenuButtonBoundingClientRect().right,
        menuTop:wx.getMenuButtonBoundingClientRect().top,
        menuHeight:wx.getMenuButtonBoundingClientRect().height
	},
    // onLaunch: function () {
    //     console.log(wx.getSystemInfoSync().statusBarHeight+44)
    // },
    attached: function () {

    },
    methods: {

    }
})