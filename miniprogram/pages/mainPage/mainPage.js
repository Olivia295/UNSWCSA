// pages/mainPage/mainPage.js
var app = getApp();
// const _ = db.command
let isAll = false
const imageCdn = 'https://tdesign.gtimg.com/mobile/demos';
const swiperList = [
    {
        value: `${imageCdn}/swiper1.png`,
        ariaLabel: '图片1',
    },
    {
        value: `${imageCdn}/swiper2.png`,
        ariaLabel: '图片2',
    },
    {
        value: `${imageCdn}/swiper1.png`,
        ariaLabel: '图片1',
    },
    {
        value: `${imageCdn}/swiper2.png`,
        ariaLabel: '图片2',
    },
];

Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: 1,
        autoplay: true,
        duration: 500,
        interval: 5000,
        swiperList,
        navBarHeight: app.globalData.navBarHeight,

        userInfo: null,

        activityList: [],
        page: 0,
        isLoad: false,
        isShow: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            userInfo: app.globalData.userInfo
        })

        isAll = false
        this.setData({
            page: 0,
            activityList: [],
            isLoad: false,
            isShow: false
        })
        this.getPages()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getTabBar().init();
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
        console.log('上拉触底事件触发')
        if (isAll) {
            return false
        }
        this.setData({
            page: this.data.page + 20
        })
        //每次下拉页数增加并获取数据
        this.getPages()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

    getPages() {
        let that = this
        that.setData({
            isLoad: true,
            isShow: true
        })

        wx.cloud.database().collection('activityList').skip(that.data.page).get()
            .then(res => {
                console.log(res.data)
                let list = that.data.activityList
                list = list.concat(res.data)
                if (res.data.length < 20) {
                    isAll = true
                    that.setData({
                        activityList: list,
                        isLoad: false
                    })
                } else {
                    that.setData({
                        activityList: list,
                        isShow: false
                    })
                }
            })
    },

    openWebView(e) {
        console.log(e.currentTarget.dataset.link)
        wx.navigateTo({
            url: '/pages/webViewPage/webViewPage?link=' + e.currentTarget.dataset.link,
        })
    },
})

