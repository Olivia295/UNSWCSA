// pages/discountFood/discountFood.js
var app = getApp();
// const _ = db.command
let isAll = false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,
    discountList:[],
    page:0,
    isLoad: false,
    isShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    isAll = false
    this.setData({
        page:0,
        discountList:[],
        isLoad:false,
        isShow:false
    })
    this.getPages()
  },

  getPages(){
    let that = this
    that.setData({
        isLoad:true,
        isShow:true
    })

    wx.cloud.database().collection('discountList').skip(that.data.page).get()
    .then(res => {
        console.log(res.data)
        let list = that.data.discountList
        list = list.concat(res.data)
        if(res.data.length < 20) {
            isAll = true
            that.setData({
                discountList:list,
                isLoad:false
            })
        } else {
            that.setData({
                discountList:list,
                isShow: false
            })
        }
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
    if(isAll){
        return false
    }
    this.setData({
        page:this.data.page+20
    })
    //每次下拉页数增加并获取数据
    this.getPages()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})

            // const length = res.data.length
            // for (let i = 0; i < length; i++) {
            //   const x = Math.floor(Math.random() * length)
            //   const y = Math.floor(Math.random() * length)
            //   const temp = res.data[x]
            //   res.data[x] = res.data[y]
            //   res.data[y] = temp
            // } 

            // this.setData({
            //     discountList: res.data
            // })