// pages/mainPage/mainPage.js
var app = getApp();
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

    activityList: [{title: "hao", description: "444",imageURL: "baidu.com"}],

    // tabPanelstyle: '',

    arr : [],

    mapCtx:null,

    tabList: [{"label":"活动0","key":0},{"label":"活动1","key":1},{"label":"活动2","key":2}],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.mapCtx = wx.createMapContext('map')
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

  openLocation(){
    wx.openLocation({
        latitude: -33.92286536760274,    // 上海的纬度
         longitude: 151.18447011533505, // 上海的经度
         name: '111', // 地点名称
         address: '学校', // 地址的详细说明
         scale: 18, // 缩放比例
         success: function(res) {
           console.log('打开地图成功');
        },
        fail: function(err) {
           console.log('打开地图失败', err);
        }
   });
  },

  onTabsChange(event) {
    console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
  },

  onTabsClick(event) {
    console.log(`Click tab, tab-panel value is ${event.detail.value}.`);
  },

    onReady: function () {
    const arr = []
    for (let i = 0; i < 20; i++) arr.push(i)
    this.setData({
      arr
    })

    setTimeout(() => {
      this.setData({
        triggered: true,
      })
    }, 1000)
  },
})

