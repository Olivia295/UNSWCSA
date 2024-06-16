// pages/profilePage/profilePage.js

let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    //   behaviors: [SkylineBehavior],
    data: {
        navBarHeight: wx.getSystemInfoSync().statusBarHeight + 44,
        userInfo: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            userInfo: app.globalData.userInfo
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getTabBar().init();

        // this.login()

        // var user = wx.getStorageSync('user'); //从本地缓存去用户信息
        // if (user && user.nickName) { //如果本地缓存有信息就显示本地缓存
        //     this.setData({
        //         userInfo: user,
        //     })
        // }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

    login() {
        wx.getUserProfile({
            desc: '获取用户信息',
            success: (res) => {
                // console.log(res.userInfo)
                var user = res.userInfo
                //保存用户信息到本地缓存
                wx.setStorageSync('user', user); 
                //设置全局用户信息
                app.globalData.userInfo = user
                //设置局部用户信息
                this.setData({
                    userInfo: user
                })

                //检查之前是否已经授权登录
                wx.cloud.database().collection('userInfo').where({
                    _openid: app.globalData.user_openid
                }).get({
                    success: res => {
                        //若没有添加过userInfo
                        if (!res.data[0]) {
                            //将数据添加到数据库
                            wx.cloud.database().collection('userInfo').add({
                                data: {
                                    avatarUrl: user.avatarUrl,
                                    nickName: user.nickName
                                },
                                success: res => {
                                    wx.showToast({
                                        title: '登录成功',
                                        icon: 'none'
                                    })
                                }
                            })
                        } else {
                            //若添加过，则读取云数据库中的数据
                            this.setData({
                                userInfo: res.data[0]
                            })
                        }
                    },
                    fail: (res) => {
                        console.log("获取用户信息失败", res)
                    }
                })
            }
        })
    },

    logOut(){
        console.log("!11")
        this.setData({
            userInfo:null
        })
        wx.setStorageSync('userInfo', null)
        app.globalData.userInfo = null
    }
})