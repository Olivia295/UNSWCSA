// pages/discountShowPage/discountShowPage.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navBarHeight: app.globalData.navBarHeight,
        id: '',
        name: '',
        type: '',
        area: '',
        telephone: '',
        wechat: '',
        discount: '',
        location: '',
        imgFileID: '',
        longitude: '',
        latitude: '',
        pages: getCurrentPages()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log('id', options.id)
        wx.cloud.database().collection('discountList')  //拿到表。双引号也行
            .doc(options.id)
            .get()
            .then(res => {
                console.log('查询单条数据成功', res.data)
                this.setData({
                    id: res.data._id,
                    name: res.data.name,
                    type: res.data.type,
                    area: res.data.area,
                    telephone: res.data.telephone,
                    wechat: res.data.wechat,
                    discount: res.data.discount,
                    location: res.data.location,
                    imgFileID: res.data.imgFileID,
                    longitude: res.data.mapPin == null ? "" :res.data.mapPin.longitude,
                    latitude: res.data.mapPin == null ? "" :res.data.mapPin.latitude
                })
                // console.log(this.data)
                if(res.data.mapPin != null){
                    wx.cloud.getTempFileURL({
                        fileList: [{
                            fileID: this.data.imgFileID
                        }]
                    }).then(res => {
                        console.log(res.fileList[0].tempFileURL)
                        this.setData({
                            imgData: res.fileList[0].tempFileURL
                        })
                    })
                }

            })
            .catch(res => {//请求失败
                console.log('失败', res)
            })

        // wx.showLoading({
        //     icon: 'loading',
        //     title: '加载中，请稍后',
        // })


    },

    toAddCart() {
        const { isStock } = this.properties;
        if (!isStock) return;
        this.triggerEvent('toAddCart');
    },

    toBuyNow(e) {
        const { isStock } = this.properties;
        if (!isStock) return;
        this.triggerEvent('toBuyNow', e);
    },

    toNav(e) {
        const { url } = e.currentTarget.dataset;
        return this.triggerEvent('toNav', {
            e,
            url,
        });
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
    copy: function (e) {
        var that = this;
        wx.setClipboardData({
            data: that.data.location,
            success: function (res) {
            }
        });
    },
    reLaunchBack() {
        // console.log(getCurrentPages())
        wx.reLaunch({
            // url的路径要在app.json注册，要加 / ,(前加 / 为绝对路径，不加为相对路径)
            url: '/pages/discountFoodPage/discountFoodPage',
        })
    },
    openWebView(e) {
        console.log(e.currentTarget.dataset.link)
        wx.navigateTo({
            url: '/pages/webViewPage/webViewPage?link=' + e.currentTarget.dataset.link,
        })
    },
    get_image(e) {
        console.log("111")
        var that = this
        console.log(e)

        wx.showLoading({
            icon: 'loading',
            title: '加载中，请稍后',
        })

        wx.cloud.getTempFileURL({
            fileList: [{
                fileID: 'cloud://cloud1-8gmum2gm4045aa3a.636c-cloud1-8gmum2gm4045aa3a-1324872193/discountPic/3.pic.jpg'
                // maxAge: 60 * 60, // one hour
            }]
        }).then(res => {
            // get temp file URL
            console.log(res.fileList)

            that.setData({
                imgData: res.fileList[0].tempFileURL
            })

        }).catch(error => {
            // handle error
        })
    },
    openMap(){
        wx.openLocation({
            latitude: this.data.latitude,   
             longitude: this.data.longitude, 
             name: this.data.name, // 地点名称
             address: this.data.location, // 地址的详细说明
             scale: 18, // 缩放比例
             success: function(res) {
               console.log('打开地图成功');
            },
            fail: function(err) {
               console.log('打开地图失败', err);
            }
       });
      },
})