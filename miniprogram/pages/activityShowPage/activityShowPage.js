// pages/activityShowPage/activityShowPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id : '',
    title: '',
    introduction: '',
    activityAddress: '',
    activityPeriod: '',
    link: '',
    survey: null,
    posterFileID: '',
    showDeadline: null,
    tags: [],
    longitude: '',
    latitude: '',
    pages: getCurrentPages(),
    posterData:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('id', options.id)
    wx.cloud.database().collection('activityList') 
        .doc(options.id)
        .get()
        .then(res => {
            console.log('查询单条数据成功', res.data)
            this.setData({
                id: res.data._id,
                title: res.data.title,
                introduction: res.data.introduction,
                activityAddress: res.data.activityAddress,
                activityPeriod: res.data.activityPeriod,
                link: res.data.link,
                survey: res.data.survey,
                posterFileID: res.data.posterFileID,
                tags: res.data.tags,
                longitude: res.data.mapPin == null ? "" :res.data.mapPin.longitude,
                latitude: res.data.mapPin == null ? "" :res.data.mapPin.latitude
            })
            wx.cloud.getTempFileURL({
                fileList: [{
                    fileID: this.data.posterFileID
                }]
            }).then(res => {
                console.log(res.fileList[0].tempFileURL)
                this.setData({
                    imgData: res.fileList[0].tempFileURL
                })
            })
        })
        .catch(res => {//请求失败
            console.log('失败', res)
        })

    // wx.showLoading({
    //     icon: 'loading',
    //     title: '加载中，请稍后',
    // })

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

  openMap(){
    wx.openLocation({
        latitude: this.data.latitude,   
         longitude: this.data.longitude, 
         name: this.data.title, // 地点名称
         address: this.data.activityAddress, // 地址的详细说明
         scale: 18, // 缩放比例
         success: function(res) {
           console.log('打开地图成功');
        },
        fail: function(err) {
           console.log('打开地图失败', err);
        }
   });
  },

  reLaunchBack() {
    // console.log(getCurrentPages())
    wx.reLaunch({
        // url的路径要在app.json注册，要加 / ,(前加 / 为绝对路径，不加为相对路径)
        url: '/pages/mainPage/mainPage',
    })
},

  openWebView(e) {
    console.log(e.currentTarget.dataset.link)
    wx.navigateTo({
        url: '/pages/webViewPage/webViewPage?link=' + e.currentTarget.dataset.link,
    })
},

  signUp() {
    console.log(this.data.survey.sid)
    wx.openEmbeddedMiniProgram({
        appId: 'wxebadf544ddae62cb',
        path: 'pages/survey/index?sid='+ this.data.survey.sid +'&hash='+ this.data.survey.hash +'&navigateBackMiniProgram=true',
      });
  },


})