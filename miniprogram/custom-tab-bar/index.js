// components/index.js
Component({
  //  组件的属性列表
  properties: { },
  //  组件的初始数据
  data: {
    value: '/pages/mainPage/mainPage',
    tabBar: [{
      url: '/pages/discountFoodPage/discountFoodPage',
      icon: 'map-search',
      label: '优惠',
    }, {
      url: '/pages/mainPage/mainPage',
      icon: 'home',
      label: '首页',
    }, {
      url: '/pages/profilePage/profilePage',
      icon: 'personal-information',
      label: '我的',
    }]
  },
  //  组件的方法列表
  methods: {
    onChange(e) {
        //console.log(e)
      this.setData({ value: e.detail.value });
      wx.switchTab({
          url: this.data.tabBar[e.detail.value].url
       });
    },
    init() {
        const page = getCurrentPages().pop();
        this.setData({
        value: this.data.tabBar.findIndex(item => item.url === `/${page.route}`)
        });
       }
    }
})